'use strict';
var Goat = require('./models/Goat');
var User = require('./models/User');
var eat_auth = require('./lib/eat_auth');
var bodyparser = require('body-parser');

module.exports = function (router, passport, appSecret) {

	router.use(bodyparser.json());

	// Goats Handlers

	router.get('/goats', eat_auth(appSecret), function(req,res) {
		Goat.find({}, function(err, data) {
			if(err) return res.status(500).send({'msg': 'the goats ran off, and could not be retrieved.'});
			console.log(data);
			res.json(data);
		});
	});

	router.post('/goats', eat_auth(appSecret), function(req,res) {
		var newGoat = new Goat(req.body);
		newGoat.save(function(err, note) {
			if (err) return res.status(500).send({'msg': 'could not save goat.'});

			res.json(note);
		});
	});

	router.put('/goats/:id', eat_auth(appSecret), function(req, res) {
	    var updatedGoat = req.body;
	    delete updatedGoat._id;
	    Goat.update({_id: req.params.id}, updatedGoat, function(err) {
	      if (err) return res.status(500).send({'msg': 'this goat has proved resistant to update.'});

	      res.json(req.body);
	    });
	});

	router.delete('/goats/:id', eat_auth(appSecret), function(req, res) {
    	Goat.remove({_id: req.params.id}, true);
    	res.end();
  	});

  	// Authentication Handlers

	router.post('/create_user', function(req, res) {
		var newUser = new User();
		newUser.basic.email = req.body.email;
		newUser.basic.password = newUser.generateHash(req.body.password);
		newUser.save(function(err, user) {
			if (err) return res.status(500).send({msg: 'could not create user'});

			newUser.generateToken(appSecret, function(err, token) {
				if (err) return res.status(500).send({msg: 'could not generate token'});
				res.json({eat: token});
			})
		});
	});


	router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
		req.user.generateToken(appSecret, function(err, token) {
			if (err) return res.status(500).send({msg: 'could not generate token'});
			res.json({eat: token});
		})
	});

};