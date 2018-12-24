const proxy = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(proxy(['/graphql'], {
		'target': 'http://localhost:4000/graphql',
		'secure': false
	}))
	app.use(proxy(['/img'], {
		'target': 'http://localhost:4000',
		'secure': false
	}))
}