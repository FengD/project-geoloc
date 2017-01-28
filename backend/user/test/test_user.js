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
			users.createUser(testMocha, function(err, result) {
				assert.notEqual(err, null);
				assert(err.duplicate);
				done();
			});
		});

		test("should create testMocha2 without error", function(done) {
			users.createUser(testMocha2, function(err, result) {
				if (err) {
					logger.error(err);
					throw err;
				}
				// console.log(result.ops);
				// assert.deepEqual(testMocha, result);
				assert.equal(testMocha2.name,result.ops[0].name);
				assert.equal(testMocha2.password,result.ops[0].password);
				done();
			});
		});
	});

	suite("#getUser()",function(){
		test("should find testMocha without error", function(done){
			users.getUser(testMocha.name,testMocha.password, function(err,result){
				// console.log(result);
				assert.equal(testMocha.name,result[0].name);
				assert.equal(testMocha.password,result[0].password);
				done();
			});
		});

		test("should not find testMocha because of the wrong password",function(done){
			users.getUser(testMocha.name, "wrong", function(err,result){
				assert.notEqual(err, null);
				assert(err.nonexistentUser);
				done();
			});
		});
	});


	suite("#getAllUser()",function(){
		test("should get testMocha and testMocha2 without error", function(done){
			users.getAllUser(function(err, result){
				// console.log(result);
				var k = 0;
				for(var i = 0; i < result.length;i++){
					if((result[i].name == testMocha.name && result[i].password == testMocha.password)
					 || (result[i].name == testMocha2.name && result[i].password == testMocha2.password)){
						k++;
					}
				}
				assert(k,2);
			});
			done();
		})
	});

	suite("#updateQuestionStep()", function(){
		test("change the question step of testMocha to 3", function(done){
			users.updateQuestionStep(testMocha.name, 3, function(err,result){
				assert.equal(err, null);
				users.getUser(testMocha.name,testMocha.password, function(err,result){
					// console.log(result);
					assert.equal(result[0].question_step,3);
					done();
				});

			});
			
		})
	});


	suite("#updatePhotoPath()", function(){
		test("change the photo path of testMocha to test.jpg", function(done){
			users.updatePhotoPath(testMocha.name, "test.jpg", function(err,result){
				assert.equal(err, null);
				users.getUser(testMocha.name,testMocha.password, function(err,result){
					// console.log(result);
					assert.equal(result[0].photo_path,"test.jpg");
					done();
				});

			});
			
		})
	});


	suite("#updateCurrentChance()", function(){
		test("change the current chance of testMocha to 4", function(done){
			users.updateCurrentChance(testMocha.name, 4, function(err,result){
				assert.equal(err, null);
				users.getUser(testMocha.name,testMocha.password, function(err,result){
					// console.log(result);
					assert.equal(result[0].current_chance,4);
					done();
				});

			});
			
		})
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

		test("should remove testMocha2 without error", function(done) {
			users.removeUser(testMocha2.name, function(err, result) {
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
		users.clean();
		done();
	});
});
