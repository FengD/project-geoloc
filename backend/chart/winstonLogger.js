/**
	@author Feng DING
*/

const winston = require('winston');
const fs = require('fs');
const logDir = __dirname + '/log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
//time stamp format
const tsFormat = () => (new Date()).toLocaleTimeString();

module.exports = exports = new winston.Logger({
	transports: [
		new winston.transports.Console({
			timestamp: tsFormat,
			colorize: true,
			level: "debug"
		}),
		new (winston.transports.File)({
			filename: `${logDir}/results.log`,
			timestamp: tsFormat,
			level: 'debug'
		})
	]
});