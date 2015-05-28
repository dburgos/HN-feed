'use strict';

require('./db');

var model = {};

model.Post   = require('./post');

module.exports = model;