/**
 * @author Thibaut SORIANO
 */

var assert = require('assert'),
	async = require("async"),
	question = require("../question"),
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

suite("question", function() {

	suiteSetup(function(done) {
		question.init(function() {
			done();
		});
	});


	suite("#createQuestion()", function() {

		test("should create testQuestion without error", function(done) {
			question.createQuestion(testQuestion, function(err, result) {
				if (err) {
					logger.error(err);
					throw err;
				}
				assert.equal(testQuestion.id,result.ops[0]._id);
				assert.equal(testQuestion.position.latitude,result.ops[0].position.latitude);
				assert.equal(testQuestion.position.longitude,result.ops[0].position.longitude);
				assert.equal(testQuestion.question,result.ops[0].question);
				assert.equal(testQuestion.type,result.ops[0].type);
				assert.equal(testQuestion.answers,result.ops[0].answers);
				assert.equal(testQuestion.choices,result.ops[0].choices);
				assert.equal(testQuestion.photoPath,result.ops[0].photo_path);
				assert.equal(testQuestion.nextQuestion,result.ops[0].next_question);
				done();
			});
		});

		test("should send error when recreating testQuestion", function(done) {
			question.createQuestion(testQuestion, function(err, result) {
				assert.notEqual(err, null);
				assert(err.duplicate);
				done();
			});
		});

		test("should create testQuestion2 without error", function(done) {
			question.createQuestion(testQuestion2, function(err, result) {
				if (err) {
					logger.error(err);
					throw err;
				}
				assert.equal(testQuestion2.id,result.ops[0]._id);
				assert.equal(testQuestion2.position.latitude,result.ops[0].position.latitude);
				assert.equal(testQuestion2.position.longitude,result.ops[0].position.longitude);
				assert.equal(testQuestion2.question,result.ops[0].question);
				assert.equal(testQuestion2.type,result.ops[0].type);
				assert.equal(testQuestion2.answers,result.ops[0].answers);
				assert.equal(testQuestion2.choices,result.ops[0].choices);
				assert.equal(testQuestion2.photoPath,result.ops[0].photo_path);
				assert.equal(testQuestion2.nextQuestion,result.ops[0].next_question);
				done();
			});
		});
	});

	suite("#getQuestion()",function(){
		test("should find testQuestion without error", function(done){
			question.getQuestion(testQuestion.id, function(err,result){
				assert.equal(testQuestion.id,result[0]._id);
				assert.equal(testQuestion.position.latitude,result[0].position.latitude);
				assert.equal(testQuestion.position.longitude,result[0].position.longitude);
				assert.equal(testQuestion.question,result[0].question);
				assert.equal(testQuestion.type,result[0].type);
				// assert.equal(testQuestion.answers,result[0].answers);
				// assert.equal(testQuestion.choices,result[0].choices);
				// assert.equal(testQuestion.photoPath,result[0].photo_path);
				// assert.equal(testQuestion.nextQuestion,result[0].next_question);
				done();
			});
		});

		test("should not find testQuestion because of the wrong id",function(done){
			question.getQuestion("wrong", function(err,result){
				assert.notEqual(err, null);
				assert(err.nonexistentQuestion);
				done();
			});
		});
	});


	suite("#getAllQuestion()",function(){
		test("should get testQuestion and testQuestion2 without error", function(done){
			question.getAllQuestion(function(err, result){
				var nbQuestions = 0;
				for(var i = 0; i < result.length;i++){
					if((result[i]._id == testQuestion.id && result[i].question == testQuestion.question)
					 || (result[i]._id == testQuestion2.id && result[i].question == testQuestion2.question)){
						nbQuestions++;
					}
				}
				assert(nbQuestions,2);
			});
			done();
		})
	});

	suite("#addCommentToQuestion()", function(){
		test("should add comment to testQuestion without error", function(done){
			question.addCommentToQuestion(testQuestion.id, "some comment", "admin", testQuestion.photo_path, function(err,result){
				assert.equal(err, null);

				question.getQuestion(testQuestion.id, function(err,result){
					assert.equal(result[0].comments[0].text, "some comment");
				});
				// console.log(result.value.comments);
				// assert.equal(testQuestion.comments[0]._id, "some comment");
				done();
			});
			
		})
		
	});

	suite("#voteToComment()", function(){
		test("should vote to the previously created comment in testQuestion without error", function(done){
			var commentId;
			// first we need to get comment id
			question.getQuestion(testQuestion.id, function(err,result){
					commentId = result[0].comments[0]._id;
			});

			question.voteToComment(testQuestion.id, commentId, "admin", function(err,result){
				assert.equal(err, null);
				// console.log(result);
				// question.getQuestion(testQuestion.id, function(err,result){
				// 	assert.equal(result[0].comments[0].text, "some comment");
				// });
				// console.log(result.value.comments);
				
			});
			
		})
	});

	suite("#removeQuestion()", function() {

		test("should remove testQuestion without error", function(done) {
			question.removeQuestion(testQuestion.id, function(err, result) {
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

		test("should reremove testQuestion with error", function(done) {
			question.removeQuestion(testQuestion.id, function(err, result) {
				assert.notEqual(err, null);
				assert(err.nonexistentQuestion);
				done();
			});
		});

		test("should remove testQuestion2 without error", function(done) {
			question.removeQuestion(testQuestion2.id, function(err, result) {
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
	});
	
	suiteTeardown(function(done) {
		question.clean();
		done();
	});
});
