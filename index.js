const Sentry = require('@sentry/bun')
Sentry.init({
	dsn: 'https://9fc32d83170d4b5b9a98029fad7c45b7@app.glitchtip.com/5898',
	tracesSampleRate: 1.0
})

const polka = require('polka')
const bodyParser = require('body-parser')
const { isValidETHTxHash, isValidETHaddress, processPoolCreated, processSellKeys } = require('./blockchain.js')
const { processGrantAccess, processRevokeAccess } = require('./telegram.js')

const server = polka()
server.use(bodyParser.json())

//createPool
//==================================================
server.post('/createPool', (req, res) => {
	const { txHash, trader, subject } = req.body

	if(!isValidETHTxHash(txHash)) {
		console.error('error /createPool', { txHash, trader, subject })
		return res.writeHead(400).end('error')
	}

	processPoolCreated(txHash)
		.then(() => res.end('success'))
		.catch(err => {
			Sentry.captureException(err);
			console.error('error processPoolCreated:', err)
			res.writeHead(500).end('error')
		})
})

//grantAccess - create one time use invite
//==================================================
server.post('/grant', (req, res) => {
	const { trader, subject, txHash, keyAmount, poolIndex } = req.body
	
	if(!isValidETHTxHash(txHash) || !isValidETHaddress(subject) || !isValidETHaddress(trader) || isNaN(Number(keyAmount))) {
		console.error('error /grant', { trader, subject, txHash, keyAmount, poolIndex })
		
		return res.writeHead(400).end('error')
	}

	processGrantAccess({ trader, subject, txHash, keyAmount, poolIndex })
		.then(() => res.end('success'))
		.catch(err => {
			Sentry.captureException(err)
			console.error('error grantAccess:', err)
			res.writeHead(500).end('error')
		})
	
	console.log('grant', req.body)
	console.log(`//grantAccess - create one time use invite
	//==================================================`)
})

//revokeAccess - kick from group
//==================================================
server.post('/revoke', async (req, res) => {
	const { trader, subject, txHash, keyAmount, poolIndex } = req.body
	
	if(!isValidETHTxHash(txHash) || !isValidETHaddress(subject) || !isValidETHaddress(trader) || isNaN(Number(keyAmount))) {
		console.error('error /grant', { trader, subject, txHash, keyAmount, poolIndex })
		
		return res.writeHead(400).end('error')
	}

	try {
		const txData = await processSellKeys(txHash)
		const status = await processRevokeAccess(txData)

		return res.end(status)

	} catch(err) {
		Sentry.captureException(err)
		console.error('error revokeAccess:', err)
		res.writeHead(500).end('error')
	}
})

server.listen(6969, err => {
	//TODO:
	Sentry.captureException(err)
	if(err) throw console.error(err)
	console.log('> running on localhost:6969')
})