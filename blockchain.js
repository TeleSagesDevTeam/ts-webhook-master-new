require('dotenv').config()

const Sentry = require('@sentry/bun')
Sentry.init({
	dsn: 'https://9fc32d83170d4b5b9a98029fad7c45b7@app.glitchtip.com/5898',
	tracesSampleRate: 1.0
})

const { createPublicClient, http, decodeFunctionData, getAddress } = require('viem')
const { arbitrumSepolia } = require('viem/chains')
const { pb } = require('./db.js')
const ABI = require('./abi.js')

const publicClient = createPublicClient({
	chain: arbitrumSepolia,
	transport: http(process.env.INFURA_RPC)
})

const processPoolCreated = async txHash => {
    const { from, input } = await publicClient.getTransaction({ hash: txHash })
    const { functionName, args } = decodeFunctionData({ abi: ABI, data: input })

    if(functionName === 'createPool') {
        const [poolIndex, priceCurve, multiPriceParam, flatPriceParam] = args

        const { id: userDbID } = await pb.collection('Users').getFirstListItem(`walletAddress="${getAddress(from)}"`)

        const { id: gatheringDbID } = await pb.collection('Gatherings').getFirstListItem(`sage="${userDbID}"&&poolIndex=-1`)

        await pb.collection('Gatherings').update(gatheringDbID, {
            priceCurve: Number(priceCurve),
            poolIndex: Number(poolIndex),
            multiPriceParam: Number(multiPriceParam) /  1e18,
            flatPriceParam: Number(flatPriceParam) /  1e18
        })
    }
}

const processSellKeys = async txHash => {
	const { from, input } = await publicClient.getTransaction({ hash: txHash })
	const { functionName, args } = decodeFunctionData({
		abi: ABI,
		data: input
	})

	if(functionName === 'sellKeys') {
		const [keySubject, poolIndex, amount, keyIdentifiers] = args

		const { id: userDbID, telegramID: tgUserID } = await pb.collection('Users').getFirstListItem(`walletAddress="${getAddress(from)}"`)
		const { telegramID: tgGroupID } = await pb.collection('Gatherings').getFirstListItem(`sage="${userDbID}"&&poolIndex=${poolIndex}`)

		const links = []
		for(const inviteDBkey of keyIdentifiers) {
			const { link } = await pb.collection('InvitationLinks').getOne(inviteDBkey)
			links.push([inviteDBkey, link])
		}

		return {
			tgUserID, tgGroupID,
			links
		}
	}

	throw Error('Incorrect function name', txHash)
}

const isValidETHTxHash = txHash => {
    const regex = /^0x[a-fA-F0-9]{64}$/
    return regex.test(txHash)
}
const isValidETHaddress = address => /^0x[a-fA-F0-9]{40}$/.test(address)

module.exports = {
	processPoolCreated,
	processSellKeys,
	isValidETHTxHash,
	isValidETHaddress
}