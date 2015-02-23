'use strict';
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/goatsapp_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'changethischangethis!');
app.use(passport.initialize());
require('./lib/passportStrategy')(passport);

var goatsRouter = express.Router();

routes(goatsRouter, passport, app.get('appSecret'));

app.use('/api/v1', goatsRouter);

app.listen(process.env.PORT || 3000, function () {
	console.log('server listening on port ' + (process.env.PORT || 3000));
});