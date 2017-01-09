/**
 * @author Feng DING
 */

"use strict";

var mongoConnection = require("./mongoDB_connection"),
	logger = require("./winstonLogger"),
	ObjectId = require('mongodb').ObjectID,
	QUESTIONS_COLLECTION = "questions";

function createQuestion(data, callback) {
	try {
		mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).insertOne({
			_id : data.id,
			position : {
				latitude : data.position.latitude, 
				longitude : data.position.longitude
			},
			question : data.question,
			type : data.type,
			answers : data.answers,
			choices : data.choices,
			first_create_time:new Date(),
			last_modified_time:new Date(),
			comments : [],
			photo_path : data.photoPath,
			next_question : data.nextQuestion
		}, function(err, result) {
			if (err) {
				logger.warn(err);
				if (err.code == 11000)
					err.duplicate = true;
				callback(err, null);
			}else{
				logger.info("question created.");
				callback(err, result);
			}
			
		});
	}
	catch(err) {
		logger.warn(err);
		callback(err, null);
	}
}

// function updateQuestion(data, callback){
// 	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).findAndModify(
// 		{_id : qid},
// 		[['_id','asc']],
// 		{
// 			$set : {_
// 				position : {
// 					latitude : data.position.latitude, 
// 					longitude : data.position.longitude
// 				},
// 				last_modified_time:new Date(),
// 				photo_path : data.photoPath,
// 				next_question : data.nextQuestion
// 			},
			
// 		},
// 		{},
// 		function(err, object) {
// 			if (err){
//         		logger.warn(err.message); // returns error if no matching object found
//         		callback(err,null);
//       		}else{
//       			logger.info("Comment success.");
//           		callback(err,object);
//       		}
//   		}
// 	);
// }

function getQuestion(qid, callback) {
	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).find({
		_id : qid,
	})
		.toArray(function(err, documents) {
		if (err) {
			logger.warn(err);
			callback(err, documents);
		}
		else {
			if (documents.length === 0 && qid) {
				err = new Error("nonexistent question");
				err.nonexistentQuestion = true;
				logger.warn("question not exists.");
				callback(err, null);
			}
			else {
				logger.info("question found.");
				documents = documents.map(function(element) {
					return element;
				});
				callback(err, documents);
			}
		}
	});
}

function getAllQuestion(callback) {
	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).find()
		.toArray(function(err, documents) {
		if (err) {
			logger.warn(err);
			callback(err, documents);
		}
		else {
			if (documents.length === 0) {
				err = new Error("question list empty.");
				err.noQuestion = true;
				logger.warn("question list empty.");
				callback(err, null);
			}
			else {
				logger.info("all questions.");
				documents = documents.map(function(element) {
					return element;
				});
				callback(err, documents);
			}
		}
	});
}

function removeQuestion(qid, callback) {
	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).deleteOne({
		_id: qid
	}, null, function(err, result) {
		if (err) {
			logger.warn(err);
			callback(err, result);
		}
		else {
			result = JSON.parse(result);
			if (result.n == 0) {
				err = new Error("nonexistent question");
				err.nonexistentQuestion = true;
				logger.warn("question not exists.");
				callback(err, null);
			}else{
				logger.info("question removed.");
				callback(err, result);	
			} 
		}
	});
}

function addCommentToQuestion(qid, text, userId, photoPath, callback){
	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).findAndModify(
		{_id : qid},
		[['_id','asc']],
		{
			$set : {last_modified_time:new Date()},
			$push : {comments : {
				_id : new ObjectId(),
				text : text,
				user_id : userId,
				photo_path : photoPath,
				votes : []
			}}
		},
		{},
		function(err, object) {
			if (err){
        		logger.warn(err.message); // returns error if no matching object found
        		callback(err,null);
      		}else{
      			logger.info("Comment success.");
          		callback(err,object);
      		}
  		}
	);
}

function voteToComment(qid,commentid,userid,callback){
	mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).findAndModify(
		{	
			_id : qid,
			"comments._id" : ObjectId(commentid)
		},
		[['_id','asc']],
		{
			$set : {last_modified_time:new Date()},
			$addToSet : {
				"comments.$.votes" : userid
			}
		},
		{},
		function(err, object) {
			if (err){
        		logger.warn(err.message); // returns error if no matching object found
        		callback(err,null);
      		}else{
      			logger.info("Vote success.");
          		callback(err,object);
      		}
  		}
	);
}

// function getNextSequence(name) {
//    var ret = mongoConnection.getDatabase().collection(QUESTIONS_COLLECTION).findAndModify(
//           {
//             query: { _id: name },
//             update: { $inc: { seq: 1 } },
//             new: true
//           }
//    );

//    return ret.seq;
// }

function init(callback) {
	mongoConnection.connect(function(err) {
		if (err) {
			logger.warn(err);
		}
		else {
			logger.info("questions initialized");
		}
		callback(err);
	});
}

function clean() {
	mongoConnection.disconnect();
}

// // Exports

exports.createQuestion = createQuestion;
exports.getQuestion = getQuestion;
exports.getAllQuestion = getAllQuestion;
exports.removeQuestion = removeQuestion;
exports.addCommentToQuestion = addCommentToQuestion;
exports.voteToComment = voteToComment;
exports.init = init;
exports.clean = clean;
