/**
	@ Auther Feng DING
*/

var express = require("express");
var fs = require("fs");
var multer = require("multer");
var logger = require("./winstonLogger")

var app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var storageUser = multer.diskStorage({
  	destination: __dirname + "/uploads/img/user",
  	filename: function (req, file, callback) {
    	callback(null,  file.originalname);
  	}
});

var storageQuestion = multer.diskStorage({
  	destination: __dirname + "/uploads/img/question",
  	filename: function (req, file, callback) {
    	callback(null,  file.originalname);
  	}
});

var storageComment = multer.diskStorage({
  	destination: __dirname + "/uploads/img/comment/",
  	filename: function (req, file, callback) {
    	callback(null,  file.originalname);
  	}
});

var uploadUser = multer({ storage : storageUser }).single('userPhoto');

var uploadQuestion = multer({ storage : storageQuestion }).single('questionPhoto');

var uploadComment = multer({ storage : storageComment }).single('commentPhoto');

app.get('/user',function(req,res){
	logger.info("user upload window sent.");
    res.sendFile(__dirname + "/indexUser.html");
});

app.get('/question',function(req,res){
	logger.info("question upload window sent.");
    res.sendFile(__dirname + "/indexQuestion.html");
});

app.get('/img/user/:uphoto',function(req,res){
	logger.info("user image sent");
    res.sendFile(__dirname + "/uploads/img/user/" + req.params.uphoto);
});

app.get('/img/question/:qphoto',function(req,res){
	logger.info("question image sent");
    res.sendFile(__dirname + "/uploads/img/question/" + req.params.qphoto);
});

app.get('/img/comment/:cphoto',function(req,res){
	logger.info("comment image sent");
    res.sendFile(__dirname + "/uploads/img/comment/" + req.params.cphoto);
});

app.post('/img/user',uploadUser,function(req,res){
  logger.info("received " + req.file);
  logger.info("The URL for the file is:" + "localhost:3000\\"+req.file.path);
  res.send(req.file);
  res.status(200).end();
});

app.post('/img/question',uploadQuestion,function(req,res){
  logger.info("received " + req.file);
  logger.info("The URL for the file is:" + "localhost:3000\\"+req.file.path);
  res.send(req.file);
  res.status(200).end();
});

app.post('/img/comment',uploadComment,function(req,res){
  logger.info("received " + req.file);
  logger.info("The URL for the file is:" + "localhost:3000\\"+req.file.path);
  res.send(req.file);
  res.status(200).end();
});

app.listen(8082,function(){
    logger.info("Upload image ready on port 8082");
});

module.exports = exports = app;

