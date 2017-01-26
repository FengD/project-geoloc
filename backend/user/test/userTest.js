var assert = require('assert'),
	async = require("async"),
	user = require("../user"),
  mongoConnection = require("../mongoDB_connection"),
	logger = require("../winstonLogger");
  // expect = require('expect'),

// var bobby = new users.User("Bobby", "Lafrite"),
// 	bobbyJson = {
// 		uid: "Bobby",
// 		pwd: "Lafrite"
// 	};

  var zhengqin = {
  name: "admin",
  password: "admin"
};


describe('user', function() {

  before(function(done) {
    // runs before all tests in this block
    user.init(function (error) {
      logger.info(error);
    });
    logger.info("Initializing test suite...");
    user.removeUser("zhengqin", function(err, result) {
      // expect(result).to.not.equal(null);
    });
    user.createUser(zhengqin, function(err, result) {
      // expect(result).to.not.equal(null);
      assert.notEqual(result, null);
    });
    done();
  });

  after(function() {
    // runs after all tests in this block
    logger.info("End of test suite, cleaning...");
    user.removeUser("zhengqin", function(err, result) {
      // expect(result).to.not.equal(null);
    });
  });

  // beforeEach(function() {
  //   // runs before each test in this block
  // });

  // afterEach(function() {
  //   // runs after each test in this block
  // });

  // test cases
  describe('#createUser()', function() {
    // logger.info("test create user");
    it('user should exist', function() {
      user.getUser("admin", "admin", function(err, result) {
        // assert.notEqual(result, null);
        logger.info("result = " + result);
      });
    });
  });
});
