module.exports = {
	development: {
		root: require('path').normalize(__dirname + '/..')
		,app: {
			name: 'Business Listing API'
		}
		, db: 'mongodb://localhost/biz'
	}
	, staging: {

	}
	, production: {

	}
}