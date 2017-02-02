/**
 * @author Thibaut SORIANO
 */

var request = require("supertest"),
	async = require("async"),
	assert = require("assert"),
	questionService = require("../question_app"),
	logger = require("../winstonLogger");

var testQuestion = {
  "id": "test1",
  "position": {
    "latitude": "43.616323",
    "longitude": "7.07355"
  },
  "question": "What is the name of this place?",
  "type": "essay",
  "answers": [
    "polytech nice sophia",
    "polytech nice-sophia",
    "polytech nice",
    "universitaire nice sophia",
    "universitaire nice sophia antipolis"
  ],
  "choices": null,
  "photoPath": "question1.png",
  "nextQuestion": "2"
}

var testQuestion2 = {
  "id": "test2",
  "position": {
    "latitude": "43.614383",
    "longitude": "7.073028"
  },
  "question": "There are how many places in the parking?",
  "type": "single-choice",
  "answers": [
    "D.212"
  ],
  "choices": [
    "A.155",
    "B.178",
    "C.194",
    "D.212",
    "E.235",
    "F.267"
  ],
  "photoPath": "question2.png",
  "nextQuestion": "3"
}

var testQuestion3 = {
  "id": "test3",
  "position": {
    "latitude": "43.615463",
    "longitude": "7.071821"
  },
  "question": "The teachers' office is in which floor?",
  "type": "single-choice",
  "answers": [
    "D.Fourth"
  ],
  "choices": [
    "A.First",
    "B.Second",
    "C.Third",
    "D.Fourth"
  ],
  "photo_path": "question3.png",
  "next_question": "4"
}

suite("question service", function(){
	suiteSetup(function (done) {
		questionService.on("ready", function () {
			done();
		});
	});
	suiteTeardown(function () {
		questionService.cleanBeforeExit();
	});
	suite("question creation", function () {
		test("should create testQuestion", function(done) {
			request(questionService)
				.post("/questions")
				.send(testQuestion)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should create testQuestion2", function(done) {
			request(questionService)
				.post("/questions")
				.send(testQuestion2)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail recreating testQuestion", function(done) {
			request(questionService)
				.post("/questions")
				.send(testQuestion)
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		// test("should fail creating bad formatted testMocha", function(done) {
		// 	request(questionService)
		// 		.post("/users")
		// 		.send({
		// 			name: "testMocha",
		// 			pwd: "testMocha"
		// 		})
		// 		.expect(400)
		// 		.end(function (err, res) {
		// 			if (err) {
		// 				logger.error(err);
		// 				throw err;
		// 			}
		// 			done();
		// 		});
		// });
	});

	suite("question removal", function () {

		test("should remove testQuestion", function(done) {
			request(questionService)
				.delete("/questions/" + testQuestion.id)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should remove testQuestion2", function(done) {
			request(questionService)
				.delete("/questions/" + testQuestion2.id)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail reremoving testQuestion", function(done) {
			request(questionService)
				.delete("/questions/" + testQuestion.id)
				.expect(400)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});

		test("should fail removing nonexistent question", function(done) {
			request(questionService)
				.delete("/questions/nonexistentQuestion")
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

	suite("questions other function Test", function () {
		var createdQuestions = [testQuestion, testQuestion2, testQuestion3];

		suiteSetup(function (done) {
			async.each(createdQuestions, function iterator (item, callback) {
				request(questionService).post("/questions").send(item).end(function (err, result) {
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
			async.each(createdQuestions, function iterator (item, callback) {
				request(questionService).delete("/questions/" + item.id).end(function (err, result) {
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


		test("should get testQuestion without error", function (done) {
			request(questionService)
				.post("/questions/" + testQuestion.id)
				.expect(200, done);
		});


		test("should fail getting non existent question", function (done) {
			request(questionService)
				.post("/questions/nonexistentQuestion")
				.expect(400, done);
		});



		test("should get all questions", function (done) {
			request(questionService)
				.get("/questions/allQuestion")
				.expect(function (res) {
					// check if at least the 3 questions we created exist
					assert(res.body.length >= 3);
					for (var i = 0; i < createdQuestions.length; i++) {
						assert(res.body.find(function(element, index, array) {
							return element._id == createdQuestions[i].id;
						}));
					}
				})
				.expect(200, done);
		});


		test("should add comment to testQuestion", function (done) {
			request(questionService)
				.post("/questions/comment/" + testQuestion.id)
				.send({ text : "some comment",
						userId : "admin",
						photoPath : testQuestion.photoPath })
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});


		test("should vote to the previously created comment in testQuestion without error", function (done) {
			var commentId;

			request(questionService)
				.post("/questions/" + testQuestion.id)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					commentId = res.body.comments[0]._id;
				});


			request(questionService)
				.post("/questions/vote/" + testQuestion.id)
				.send({ commentId : commentId,
						userId : "admin" })
				.expect(200)
				.end(function (err, res) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done();
				});
		});
	});
});