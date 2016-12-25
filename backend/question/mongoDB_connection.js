/**
	@auther Feng DING
*/

var MongoClient = require('mongodb').MongoClient,
	// assert = require('assert'),
	// ObjectId = require('mongodb').ObjectID,
	logger = require("./winstonLogger"),
	url = 'mongodb://localhost:27017/geoloc',
	database = null;

function connect(callback) {
	MongoClient.connect(url, function(err, db) {
	    if (err) {
	    	logger.error(err);
	    	callback(err);
	    }
	    else {
	      	logger.info("Connected to mongodb.");
	      	database = db;
	  	  	callback(null);
	    }
	});
}

function disconnect() {
  database.close();
  logger.info("Disconnected to mongodb.");
}

function getDatabase() {
	if (database == null) {
		connect(function(err) {
			if(err){
				logger.error(err);
				return null;
			}else{
				logger.info("get database.");
				return database;
			}
		});
	}
	else {
		logger.info("got database.");
		return database;
	}
}

// Exports the functions

exports.connect = connect;
exports.disconnect = disconnect;
exports.getDatabase = getDatabase;