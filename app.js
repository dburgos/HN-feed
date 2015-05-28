'use strict';

// Dependencies
var config          = require('./config');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var compress        = require('compression');
var multipart       = require('connect-multiparty');
var app             = express();

// Configuration
app.enable('trust proxy');
app.set('port', config.app.settings.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(compress());
app.use(bodyParser.json({ limit: '128kb'}));
app.use(multipart());
app.use(express.static('public'));
app.use(methodOverride());

// Routes
require('./app/routes')(app);

module.exports = app;