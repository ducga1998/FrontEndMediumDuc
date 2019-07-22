const proxy = require('http-proxy-middleware')
  
module.exports = function (app) {
	app.use(proxy(['/shopify', '/graphql','/image-proxy', '/api','/help-center', '/ali-reviews-proxy' ], {
		'target': 'http://localhost:8080/',
		'secure': false,
	}))
	
}
