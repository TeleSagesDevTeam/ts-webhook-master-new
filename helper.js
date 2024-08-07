require('dotenv').config()

// const Sentry = require('@sentry/bun')
// Sentry.init({
// 	dsn: 'https://9fc32d83170d4b5b9a98029fad7c45b7@app.glitchtip.com/5898',
// 	tracesSampleRate: 1.0
// })

const { Telegram } = require('telegraf')
const { pb } = require('./db.js')

const telegram = new Telegram(process.env.BOT_KEY)

const genInvite = async chatID => {
    const { invite_link, is_revoked } = await telegram.createChatInviteLink(chatID, {
        member_limit: 1,
        // expire_date: 
        // name: 
    })
    console.log({ invite_link, is_revoked })
    if(invite_link && !is_revoked) return invite_link
    else return false
}
const revokeInvite = async (chatID, inviteLink) => {
    try {
        const result = await telegram.revokeChatInviteLink(chatID, inviteLink)
        console.log(result)
        return result && result.revoked
    } catch(error) {
        console.error("Failed to revoke invite link:", error)
        //Sentry
        return false
    }
}

const kickUser = async (chatID, userID) => {
    try {
        const banResult = await telegram.banChatMember(chatID, userID, undefined, true)
        const unbanResult = await telegram.unbanChatMember(chatID, userID)

        return banResult && unbanResult
    } catch(error) {
        if(error.message.includes('USER_NOT_PARTICIPANT') || error.message.includes('method is available for supergroup and channel chats only')) {
            console.log('yay')
            return true
        }
        //Sentry
        return false
    }
}

// genInvite(-1002026032023)
revokeInvite(-4025193709, 'https://t.me/+eKr1oa_-zww2YTdk')

// kickUser(-4025193709, 6305547640)