require('dotenv').config()
const PocketBase = require('pocketbase/cjs')

const { BACKEND_TOKEN, POCKETBASE_URL } = process.env
const pb = new PocketBase(POCKETBASE_URL)

pb.beforeSend = function(url, options) {
	options.headers = Object.assign({}, options.headers, {
		'BACKEND_TOKEN': BACKEND_TOKEN
	})
}

module.exports = {
	pb
}