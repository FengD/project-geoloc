/**
 * @author Feng DING
 */

"use strict";

var mongoConnection = require("./mongoDB_connection"),
	logger = require("./winstonLogger"),
	USERS_COLLECTION = "users";

function createUser(data, callback) {
	try {
		mongoConnection.getDatabase().collection(USERS_COLLECTION).insertOne({
			_id: data.name,
			name: data.name,
			password: data.password,
			first_create_time:new Date(),
			last_modified_time:new Date(),
			question_step: "1",
			photo_path:"default.jpg",
			current_chance:5
		}, function(err, result) {
			if (err) {
				logger.warn(err);
				if (err.code == 11000)
					err.duplicate = true;
			}else{
				logger.info("user created.");
				callback(err, result);
			}
			
		});
	}
	catch(err) {
		logger.warn(err);
		callback(err, null);
	}
}

function getUser(name, password, callback) {
	mongoConnection.getDatabase().collection(USERS_COLLECTION).find({
		name : name,
		password : password
	})
		.toArray(function(err, documents) {
		if (err) {
			logger.warn(err);
			callback(err, documents);
		}
		else {
			if (documents.length === 0 && (name || password)) {
				err = new Error("nonexistent user");
				err.nonexistentUser = true;
				logger.warn("user not exists.");
				callback(err, null);
			}
			else {
				logger.info("user found.");
				documents = documents.map(function(element) {
					return element;
				});
				callback(err, documents);
			}
		}
	});
}

function removeUser(uid, callback) {
	mongoConnection.getDatabase().collection(USERS_COLLECTION).deleteOne({
		_id: uid
	}, null, function(err, result) {
		if (err) {
			logger.warn(err);
			callback(err, result);
		}
		else {
			result = JSON.parse(result);
			if (result.n == 0) {
				err = new Error("nonexistent user");
				err.nonexistentUser = true;
				logger.warn("user not exists.");
				callback(err, null);
			}else{
				logger.info("user removed.");
				callback(err, result);	
			} 
		}
	});
}

//-------------update user-----------------------
function updateQuestionStep(uid, questionStep,callback){
	mongoConnection.getDatabase().collection(USERS_COLLECTION).findAndModify(
		{_id : uid},
		[['_id','asc']],
		{$set: {question_step:questionStep, last_modified_time:new Date()}},
		{},
		function(err, object) {
			if (err){
        		logger.warn(err.message); // returns error if no matching object found
        		callback(err,null);
      		}else{
      			logger.info("update question step success.");
          		callback(err,object);
      		}
  		}
	);
}

function updatePhotoPath(uid, photoPath,callback){
	mongoConnection.getDatabase().collection(USERS_COLLECTION).findAndModify(
		{_id : uid},
		[['_id','asc']],
		{$set: {photo_path : photoPath, last_modified_time:new Date()}},
		{},
		function(err, object) {
			if (err){
        		logger.warn(err.message); // returns error if no matching object found
        		callback(err,null);
      		}else{
      			logger.info("update photo path success.");
          		callback(err,object);
      		}
  		}
	);
}

function updateCurrentChance(uid, currentChance,callback){
	mongoConnection.getDatabase().collection(USERS_COLLECTION).findAndModify(
		{_id : uid},
		[['_id','asc']],
		{$set: {current_chance:currentChance, last_modified_time:new Date()}},
		{},
		function(err, object) {
			if (err){
        		logger.warn(err.message); // returns error if no matching object found
        		callback(err,null);
      		}else{
      			logger.info("update current chance success.");
          		callback(err,object);
      		}
  		}
	);
}

//-----------------------------------------------


function init(callback) {
	mongoConnection.connect(function(err) {
		if (err) {
			logger.warn(err);
		}
		else {
			logger.info("users initialized");
		}
		callback(err);
	});
}

function clean() {
	mongoConnection.disconnect();
}

// // Exports

exports.createUser = createUser;
exports.getUser = getUser;
exports.removeUser = removeUser;
exports.updateQuestionStep = updateQuestionStep;
exports.updatePhotoPath = updatePhotoPath;
exports.updateCurrentChance = updateCurrentChance;
exports.init = init;
exports.clean = clean;