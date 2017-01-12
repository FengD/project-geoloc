/**
 * @author Feng DING
 */

var express = require("express"),
	bodyParser = require("body-parser"),
	questionsRouter = require("./question_router"),
	logger = require("./winstonLogger"),
	app = express(),
	port = 8081;

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

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use("/questions", questionsRouter);

app.cleanBeforeExit = function cleanBeforeExit() {
	logger.info("exiting...");
	questionsRouter.clean();
}

process.on("beforeExit", function() {
	app.cleanBeforeExit();
});

process.on("SIGINT", function() {
	app.cleanBeforeExit();
	process.exit(0);
});

(function init() {
	questionsRouter.init(function (err) {
		if (err) {
			logger.error(err);
			app.cleanBeforeExit();
			exit(1);
		}
		else {
			app.listen(port);
			logger.info("listening to", port);
			app.emit("ready");
		}
	});
})();

// Exports

module.exports = exports = app;