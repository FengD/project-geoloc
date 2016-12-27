/**
	@ Auther Feng DING
*/

var express = require("express");
var fs = require("fs");
var multer = require("multer");

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
  destination: function (req, file, callback) {
    callback(null, './uploads/img/user/');
  },
  filename: function (req, file, callback) {
    callback(null,  file.originalname);
  }
});

var storageQuestion = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/img/question/');
  },
  filename: function (req, file, callback) {
    callback(null,  file.originalname);
  }
});

var uploadUser = multer({ storage : storageUser }).single('userPhoto');

var uploadQuestion = multer({ storage : storageQuestion }).single('questionPhoto');

app.get('/user',function(req,res){
      res.sendFile(__dirname + "/indexUser.html");
});

app.get('/question',function(req,res){
      res.sendFile(__dirname + "/indexQuestion.html");
});

app.get('/img/user/:uphoto',function(req,res){
      res.sendFile(__dirname + "/uploads/img/user/" + req.params.uphoto);
});

app.get('/img/question/:qphoto',function(req,res){
      res.sendFile(__dirname + "/uploads/img/question/" + req.params.qphoto);
});

app.post('/img/user',function(req,res){
    uploadUser(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.post('/img/question',function(req,res){
    uploadQuestion(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(8082,function(){
    console.log("Upload image ready on port 8082");
});

module.exports = exports = app;

