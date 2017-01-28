/**
 * @author Feng DING
 */

var assert = require('assert'),
	async = require("async"),
	users = require("../user"),
	logger = require("../winstonLogger");

var testMocha = {
	name: "testMocha",
	password: "testMocha"
};

var testMocha2 = {
	name: "testMocha2",
	password: "testMocha2"
};

suite("users", function() {

	suiteSetup(function(done) {
		users.init(function() {
			done();
		});
	});


	suite("#createUser()", function() {

		test("should create testMocha without error", function(done) {
			users.createUser(testMocha, function(err, result) {
				if (err) {
					logger.error(err);
					throw err;
				}
				// console.log(result.ops);
				// assert.deepEqual(testMocha, result);
				assert.equal(testMocha.name,result.ops[0].name);
				assert.equal(testMocha.password,result.ops[0].password);
				done();
			});
		});

		test("should send error when recreating testMocha", function(done) {
			users.createUser(testMocha, function(err, reslsult) {
				assert.notEqual(err, null);
				assert(err.duplicate);
				done();
			});
		});
	});

	suite("#removeUser()", function() {

		test("should remove testMocha without error", function(done) {
			users.removeUser(testMocha.name, function(err, result) {
				if (err) {
					logger.error(err);
					throw err;
				}
				assert.deepEqual({
					ok: 1,
					n: 1
				}, result);
				done();
			});
		});

		test("should reremove testMocha with error", function(done) {
			users.removeUser(testMocha.name, function(err, result) {
				assert.notEqual(err, null);
				assert(err.nonexistentUser);
				done();
			});
		});
	});
	
	suiteTeardown(function(done) {
		users.clean();
		done();
	});
});
