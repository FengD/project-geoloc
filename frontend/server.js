var express = require('express');
var path = require('path');
var app = express();


// // Setup View Engines
app.set('views', path.join(__dirname, 'app'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname + '/')));

// GET index.html route
app.get('/', function(req, res) {
  	return res.render('index');
});

// Start our server and start to listen
app.listen(process.env.PORT || 3000, function() {
  	console.log('listening at 3000');
  	console.log('Go to http://localhost:3000 to see the page.');
});