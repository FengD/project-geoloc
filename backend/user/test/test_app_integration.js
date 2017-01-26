/**
 * @author Feng DING
 */

var request = require("supertest"),
	async = require("async"),
	assert = require("assert"),
	userService = require("../user_app"),
	logger = require("../winstonLogger");

var testMocha = {
	name: "testMocha",
	password: "testMocha"
};

var testMocha2 = {
	name: "testMocha2",
	password: "testMocha2"
};

suite("users service", function(){
	suiteSetup(function (done) {
		userService.on("ready", function () {
			done();
		});
	});
	suiteTeardown(function () {
		userService.cleanBeforeExit();
	});
	suite("user creation", function () {
		test("should create testMocha", function(done) {
			request(userService)
				.post("/users")
				.send(testMocha)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should create testMocha2", function(done) {
			request(userService)
				.post("/users")
				.send(testMocha2)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail recreating testMocha", function(done) {
			request(userService)
				.post("/users")
				.send(testMocha)
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail creating bad formatted testMocha", function(done) {
			request(userService)
				.post("/users")
				.send({
					name: "testMocha",
					pwd: "testMocha"
				})
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});
	});

	suite("user removal", function () {

		test("should remove testMocha", function(done) {
			request(userService)
				.delete("/users/" + testMocha.name)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should remove testMocha2", function(done) {
			request(userService)
				.delete("/users/" + testMocha2.name)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail reremoving testMocha", function(done) {
			request(userService)
				.delete("/users/" + testMocha.name)
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail removing nonexistent user", function(done) {
			request(userService)
				.delete("/users/nonexistentUser")
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});
	});

	suite("user other function Test", function () {

		var testMocha3 = { name: "testMocha3", password:"testMocha3" };
		var createdUsers = [testMocha, testMocha2, testMocha3];

		suiteSetup(function (done) {
			async.each(createdUsers, function iterator (item, callback) {
				request(userService).post("/users").send(item).end(function (err, result) {
					callback(err);
				});
			}, function join (err) {
				if (err) {
					logger.error(err);
					throw err;
				}
				done();
			});
		});

		suiteTeardown(function (done) {
			async.each(createdUsers, function iterator (item, callback) {
				request(userService).delete("/users/" + item.name).end(function (err, result) {
					callback(err);
				});
			}, function join (err) {
				if (err) {
					logger.error(err);
					throw err;
				}
				done();
			});
		});

		// test("should get testMocha by posting password", function (done) {
		// 	request(userService)
		// 		.post("/users/" + testMocha.name)
		// 		.send({ password : testMocha.password })
		// 		.expect(200, {
		// 			name: testMocha.name,
		// 			password: testMocha.password
		// 		}, done);
		// });

		test("should fail getting testMocha with bad password", function (done) {
			request(userService)
				.post("/users/" + testMocha.name)
				.send({ password: "ss" })
				.expect(400, done);
		});

		test("should get all users", function (done) {
			request(userService)
				.get("/users/allUser")
				.expect(function (res) {
					assert(res.body.length >= 3);
					for (var i = 0; i < createdUsers.length; i++) {
						assert(res.body.find(function(element, index, array) {
							return element.name == createdUsers[i].name;
						}));
					}
				})
				.expect(200, done);
		});
	});
});