var express =require('express'),
	routes = require('./routes'),
	http = require('http');

// set express
var app = express();
app.set('view engine', 'jade');

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});


app.configure(function(){
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);
});


function logErrors(err, req, res, next){
	console.error('logErrors', err.toString());
	next(err);
}

function clientErrorHandler(err, req, res, next){
	console.error('clientErrors', err.toString());
	res.send(500, {error: err.toString});
	if(req.xhr){
		console.error(err);
		res.send(500, {error: err.toString()});
	}else{
		next(err);
	}
}

function errorHandler(err, req, res, next){
	console.error('lastErrors', err.toString());
	res.send(500,{error: err.toString()});
	res.send(500, {error: err.toString()});
}

// set database connection
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/biz';
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var connection = mongoose.createConnection(dbUrl);
autoIncrement.initialize(connection);

connection.on('error', console.error.bind(console, 'connection error'));
connection.open('open', function(){
	console.info('connected to database');
});

// set models
var models = require('./models');
models.Listing.plugin(autoIncrement.plugin, 'Listing');
models.Category.plugin(autoIncrement.plugin, 'Category');
// models.Address.plugin(autoIncrement.plugin, 'Address');

function db(req, res, next){
	req.db = {
		Listing : connection.model('Listing', models.Listing, 'listings'),
		Category: connection.model('Category', models.Category, 'categories')
	}
	return next();
}


// router
// category
app.get('/category/add', db, routes.category.add);
app.get('/category/get/:id', db, routes.category.get);
app.get('/category/list', db, routes.category.list);
app.post('/category/save', db, routes.category.save);

// listing
app.get('/listing/add', db, routes.listing.add);
app.get('/listing/get/:id', db, routes.listing.get);
app.get('/listing/search', db, routes.listing.search);
app.get('/listing/performSearch', db, routes.listing.performSearch);
app.post('/listing/save', db, routes.listing.save);

app.get('/', function(req, res){
	res.render('../public/views/api')
});

http.createServer(app);

if(require.main === module){
	app.listen(app.get('port'),function(){
		console.info('Express server listening on port ' + app.get('port'));
	});
}else{
	console.info('Running app as a module');
	exports.app = app;
}













