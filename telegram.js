require('dotenv').config()

const Sentry = require('@sentry/bun')
Sentry.init({
	dsn: 'https://9fc32d83170d4b5b9a98029fad7c45b7@app.glitchtip.com/5898',
	tracesSampleRate: 1.0
})

const { Telegram } = require('telegraf')
const { pb } = require('./db.js')

const telegram = new Telegram(process.env.BOT_KEY)

const genInvite = async chatID => {
    const { invite_link, is_revoked } = await telegram.createChatInviteLink(chatID, {
        member_limit: 1,
        // expire_date: 
        // name: 
    })
    if(invite_link && !is_revoked) return invite_link
    else return false
}

const revokeInvite = async (chatID, inviteLink) => {
    try {
        const result = await telegram.revokeChatInviteLink(chatID, inviteLink)

        return result && result.revoked
    } catch(error) {
        throw Error(error)
    }
}
const kickUser = async (chatID, userID) => {
    try {
        const banResult = await telegram.banChatMember(chatID, userID, undefined, true)
        const unbanResult = await telegram.unbanChatMember(chatID, userID)

        return banResult && unbanResult
    } catch(error) {
        if(error.message.includes('USER_NOT_PARTICIPANT') || error.message.includes('method is available for supergroup and channel chats only')) {
            return true
        }
        throw Error(error)
    }
}

const processGrantAccess = async ({ trader, subject, txHash, keyAmount, poolIndex }) => {
    try {
        const { id: dbUserID, telegramID: tgUserID } = await pb.collection('Users').getFirstListItem(`walletAddress="${trader}"`)
        const { id: dbSageID, telegramID: tgSageID } = await pb.collection('Users').getFirstListItem(`walletAddress="${subject}"`)
        const { id: dbGatheringID, telegramID: tgGroupID } = await pb.collection('Gatherings').getFirstListItem(
            `sage="${dbSageID}" && poolIndex=${poolIndex}`
        )

        for(const _ of Array.from({ length: keyAmount })) {
            const inviteLink = await genInvite(tgGroupID)
            const status = inviteLink ? 'unused' : 'error'

            console.log({
                userID: dbUserID,
                gatheringID: dbGatheringID,
                link: inviteLink || 'http://fail',
                status, txHash
            })

            await pb.collection('InvitationLinks').create({
                userID: dbUserID,
                gatheringID: dbGatheringID,
                link: inviteLink || 'http://fail',
                status, tx: txHash
            })
        }

        return 'success'

    } catch(error) {
        Sentry.captureException(error)
        console.log('---------------------------------------------------------------')
        console.log('error processingGrantAccess', { trader, subject, txHash, keyAmount, poolIndex })
        error.status != 404 ? console.log(error) : null
        console.log('---------------------------------------------------------------')
        return 'error'
    }
}

const processRevokeAccess = async ({ tgUserID, tgGroupID, links }) => {
    try {
        await kickUser(tgGroupID, tgUserID)
        for(const i of links) {
            const [inviteDBkey, link] = i
            await revokeInvite(tgGroupID, link)
            await pb.collection('InvitationLinks').update(inviteDBkey, { status: 'revoked' })
        }

        return 'success'
    } catch(error) {
        Sentry.captureException(error)
        console.log('---------------------------------------------------------------')
        console.log('error processingGrantAccess', { tgUserID, tgGroupID, links })
        error.status != 404 ? console.log(error) : null
        console.log('---------------------------------------------------------------')
        return 'error'
    }
}

module.exports = {
    processGrantAccess,
    processRevokeAccess
}