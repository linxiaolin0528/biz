
var express = require('express'), 
	fs = require('fs'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// load config
var env = process.env.NODE_ENV || 'development',
	config = require('./config/config')[env],
	mongoose = require('mongoose');

// set db connection
var db = mongoose.connect('mongodb://localhost/biz');

// set models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file){
	require(models_path + '/' + file);
});

// set express
var express = require('express');
var app = express();
app.use(express.bodyParser());


// express settings
require('./config/express')(app,config);

// set routes
require('./config/routes')(app);

// start app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started - port '+port);
