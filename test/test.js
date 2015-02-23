'use strict';

process.env.MONGO_URI = 'mongodb://localhost/goatapp_test';
require('../server.js');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

var entryToPut;
var sendObject = {goatSays: 'Im a trip of a goat', goatHandler: 'nobody knows me better'};
var putObject = {goatSays: 'Im a goat even more', goatHandler: 'Josh is my handler'}
var testToken;

describe('api end points', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should create a user', function(done) {
		chai.request('localhost:3000/api/v1')
			.post('/create_user')
			.send({email: "test", password: "password"})
			.end(function(err, res) {
				expect(err).to.eql(null);
				testToken = res.body.eat;
				sendObject.eat = testToken;
				putObject.eat = testToken;
				console.log(testToken);
				expect(res.body).to.have.property('eat');
				done();
			});
	});

	it('should responsd to a post request', function(done) {
		chai.request('localhost:3000/api/v1')
			.post('/goats')
			.send(sendObject)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body).to.have.property('_id');
				entryToPut = res.body._id;
				console.log(entryToPut);
				expect(res.body.goatSays).to.eql('Im a trip of a goat');
				expect(res.body.goatHandler).to.eql('nobody knows me better');
				done();
			});
	});

	it('should respond to a put request', function(done) {
		chai.request('localhost:3000/api/v1')
			.put('/goats/' + entryToPut)
			.send(putObject)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.goatSays).to.eql('Im a goat even more');
				expect(res.body.goatHandler).to.eql('Josh is my handler');
				done();
			});
	});

	it('should respond to a get request', function(done) {
		chai.request('localhost:3000/api/v1')
			.get('/goats')
			.send({eat: testToken})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
      			expect(res.body[0]).to.have.property('goatSays');
      			expect(res.body[0]).to.have.property('goatHandler');
				expect(res.body[0]._id).to.eql(entryToPut);
				done();
			});
	});

	it('should delete a goat from the database', function(done) {
    	chai.request('localhost:3000/api/v1')
    		.del('/goats/' + entryToPut)
    		.send({eat: testToken})
    		.end(function(err, res) {
      			expect(err).to.eql(null);
      			done();
    		});
    });

    it('should be empty now', function(done) {
		chai.request('localhost:3000/api/v1')
			.get('/goats')
			.send({eat: testToken})
			.end(function(err, res) {
				expect(err).to.eql(null);
      			expect(res.body[0]).to.eql(undefined);
				done();
			});
  	});
});