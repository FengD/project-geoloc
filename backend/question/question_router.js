/**
 * @author Feng DING
 */

var express = require("express"),
	router = express.Router(),
	question = require("./question"),
	logger = require("./winstonLogger");

router.use(function(request, response, next) {
  	logger.info("" + request.method + " " + request.url);
  	next();
});


router.post("/", function(request, response){
	question.createQuestion(request.body, function(err, result){
		if(err){
			logger.error(err);
			if(err.duplicate){
				response.status(400).send(err);
			}else{
				response.status(500).send(err);
			}
		}else{
			logger.info("Create question success.");
			response.send("Create question success.");
		}
	});
});

router.post("/:qid", function (request, response) {
	question.getQuestion(request.params.qid, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentQuestion) {
				response.status(400).send(err);
			}
			else {
				response.status(500).send(err);
			}
		}
		else {
			logger.info(result[0]);
			response.send(result[0]);
		}
	});
});

router.get("/allQuestion", function (request, response) {
	question.getAllQuestion(function (err, result) {
		if (err) {
			logger.error(err);
			if (err.noQuestion) {
				response.status(400).send(err);
			}
			else {
				response.status(500).send(err);
			}
		}
		else {
			logger.info(result);
			response.send(result);
		}
	});
});

router.delete("/:qid", function (request, response) {
	question.removeQuestion(request.params.qid, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentQuestion) {
				response.status(400).send(err);
			}
			else {
				response.status(500).send(err);
			}
		}
		else {
			logger.info(result);
			response.send(result);
		}
	});
});

router.post("/comment/:qid", function (request, response) {
	question.addCommentToQuestion(request.params.qid, request.body.text, request.body.userId, request.body.photoPath, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentQuestion) {
				response.status(400).send(err);
			}
			else {
				response.status(500).send(err);
			}
		}
		else {
			logger.info(result);
			response.send(result);
		}
	});
});

router.post("/vote/:qid", function (request, response) {
	question.voteToComment(request.params.qid, request.body.commentId, request.body.userId, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentQuestion) {
				response.status(400).send(err);
			}
			else {
				response.status(500).send(err);
			}
		}
		else {
			logger.info(result);
			response.send(result);
		}
	});
});

router.init = function init(callback) {
	question.init(function (err) {
		if (err) {
			logger.warn(err);
		}
		else {
			logger.info("question router initialized");
		}
		callback(err);
	});
};

router.clean = function clean() {
	question.clean();
};

// Exports

module.exports = exports = router;
