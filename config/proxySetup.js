const proxy = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(proxy(['/shopify', '/graphql', '/image-proxy', '/api', '/help-center', '/ali-reviews-proxy'], {
		'target': 'http://localhost:4000/',
		'secure': false,
	}))

}
