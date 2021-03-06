/**
 * @author Feng DING
 */

var express = require("express"),
	router = express.Router(),
	user = require("./user"),
	logger = require("./winstonLogger");

router.use(function(request, response, next) {
  	logger.info("" + request.method + " " + request.url);
  	next();
});

// router.get("/", function(request, response){
// 	user.getUser(request.body.name, request.body.password, function(err, documents){
// 		if(err){
// 			logger.error(err);
// 			response.status(500).send(err);
// 		}else{
// 			logger.info(documents);
// 			response.send(documents);
// 		}
// 	});
// });

// router.get("/:name", function(request, response){
// 	user.getUser(request.params.name, null, function(err, documents){
// 		if(err){
// 			logger.error(err);
// 			if (err.nonexistentUser) {
// 				response.status(400).send(err);
// 			}
// 			else {
// 				response.status(500).send(err);
// 			}
// 		}else{
// 			logger.info(documents);
// 			response.send(documents);
// 		}
// 	});
// });

router.post("/", function(request,response){
	user.createUser(request.body, function(err, result){
		if(err){
			logger.error(err);
			if(err.duplicate){
				response.status(400).send(err);
			}else{
				response.status(500).send(err);
			}
		}else{
			logger.info("Create user success.");
			response.send("Create user success.");
		}
	});
});

router.post("/:name", function (request, response) {
	user.getUser(request.params.name, request.body.password, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentUser) {
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

router.get("/allUser", function (request, response) {
	user.getAllUser(function (err, result) {
		if (err) {
			logger.error(err);
			if (err.noUser) {
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

router.delete("/:name", function (request, response) {
	user.removeUser(request.params.name, function (err, result) {
		if (err) {
			logger.error(err);
			if (err.nonexistentUser) {
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

router.post("/updateQuestionStep/:name",function(request, response){
	user.updateQuestionStep(request.params.name,request.body.step,function(err, object){
		if(err){
			logger.error(err);
			response.status(400).send(err);
		}else{
			logger.info(object);
			response.send(object);
		}
	});
});

router.post("/updatePhotoPath/:name",function(request, response){
	user.updatePhotoPath(request.params.name,request.body.photo,function(err, object){
		if(err){
			logger.error(err);
			response.status(400).send(err);
		}else{
			logger.info(object);
			response.send(object);
		}
	});
});

router.post("/updateCurrentChance/:name",function(request, response){
	user.updateCurrentChance(request.params.name,request.body.chance,function(err, object){
		if(err){
			logger.error(err);
			response.status(400).send(err);
		}else{
			logger.info(object);
			response.send(object);
		}
	});
});

router.init = function init(callback) {
	user.init(function (err) {
		if (err) {
			logger.warn(err);
		}
		else {
			logger.info("router initialized");
		}
		callback(err);
	});
};

router.clean = function clean() {
	user.clean();
};

// Exports

module.exports = exports = router;