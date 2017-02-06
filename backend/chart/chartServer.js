// We need to use the express framework: have a real web servler that knows how to send mime types etc.
var express=require('express');

// Init globals variables for each module required
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , logger = require("./winstonLogger")
  , io = require('socket.io').listen(server);

// launch the http server on given port
server.listen(8083);

var users = {};


var options = {
    host: 'localhost',
    port: 8081,
    path: '/questions/allQuestion',
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

var allQuestions = http.request(options,function(response){
    logger.info("Get All question");
    response.on('data',function(data){
        var questions = JSON.parse(data);
        logger.info(questions.length + " questions");
        initChartServer(questions.length);
    });
});

allQuestions.end();

var initChartServer = function(questionNB){
	var chartGroups = [];
	for(var i = 0;i < questionNB;i++){
		chartGroups.push("question"+(i+1));
	}
	io.sockets.on('connection', function (socket) {
		logger.info("Connected");
		
		// when the client emits 'adduser', this listens and executes
		socket.on('adduser', function(username, questionStep, position){
			// store the username in the socket session for this client
			socket.username = username;
			// store the room name in the socket session for this client
			socket.question = 'question'+questionStep;
			// add the client's username to the global list
			users[username] = username;
			// send client to room 1
			socket.join('question'+questionStep);
			// echo to client they've connected
			// socket.emit('updatechat', 'SERVER', 'you have connected to room'+questionStep);
			// echo to room 1 that a person has connected to their room
			socket.broadcast.to('question'+questionStep).emit('updatechat', 'ADMIN', username + ' is now answering this question.');
			socket.emit('updaterooms', chartGroups, 'question'+questionStep);
			// socket.emit('toAdmin',username,questionStep,position,date);
		});
		
		// when the client emits 'sendchat', this listens and executes
		socket.on('sendchat', function (username,data) {
			// we tell the client to execute 'updatechat' with 2 parameters
			io.sockets.in(socket.question).emit('updatechat', username, data, new Date());		
		});

		// when the client emits 'sendchat', this listens and executes
		// socket.on('toAdminInfo', function (username,questionStep,position,date) {
		// 	// we tell the client to execute 'updatechat' with 2 parameters
		// 	socket.emit('toAdmin',username,questionStep,position,date);		
		// });
		
		socket.on('switchRoom', function(newQuestion,date){
			socket.leave(socket.question);
			socket.join(newQuestion);
			socket.emit('updatechat', 'ADMIN', 'you are now answering '+ newQuestion+".", new Date());
			// sent message to OLD room
			socket.broadcast.to(socket.question).emit('updatechat', 'ADMIN', socket.username+' passed this question correctly.',new Date());
			// update socket session room title
			socket.question = newQuestion;
			socket.broadcast.to(newQuestion).emit('updatechat', 'ADMIN', socket.username+' is now answering this question.',new Date());
			socket.emit('updaterooms', chartGroups, newQuestion);
		});
		

		// when the user disconnects.. perform this
		socket.on('disconnect', function(){
			// remove the username from global usernames list
			delete users[socket.username];
			// update list of users in chat, client-side
			io.sockets.emit('updateusers', users);
			// echo globally that this client has left
			socket.broadcast.emit('updatechat', 'ADMIN', socket.username + ' has disconnected.',"",new Date());
			socket.leave(socket.question);
		});
	});
}


