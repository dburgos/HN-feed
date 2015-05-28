'use strict';

// Dependencies
var config          = require('./config');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var compress        = require('compression');
var favicon         = require('serve-favicon');
var multipart       = require('connect-multiparty');
var app             = express();

// Configuration
app.enable('trust proxy');
app.set('port', config.app.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(compress());
app.use(favicon(__dirname + '/public/img/favicon.png'));
app.use(bodyParser({ limit: '128kb'}));
app.use(multipart());
app.use(express.static(__dirname+'/public'), { maxAge: 86400000 });
app.use(methodOverride());

// Routes
require('./app/routes')(app);

module.exports = app;