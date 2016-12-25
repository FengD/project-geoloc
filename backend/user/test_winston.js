// 'use strict';
// const winston = require('winston');
// const tsFormat = () => (new Date()).toLocaleTimeString();
// const logger = new (winston.Logger)({
//   transports: [
//     // colorize the output to the console
//     new (winston.transports.Console)({ timestamp: tsFormat,
//       colorize: true, })
//   ]
// });

// //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// logger.level = 'debug';
// // logger.info('Hello debug');
// logger.debug('Debugging info');

// // logger.level = 'error';
// // logger.info('Hello error');
// logger.error('Debugging info');

// // logger.level = 'warn';
// // logger.info('Hello warn');
// logger.warn('Debugging info');

// // logger.level = 'info';
// // logger.info('Hello info');
// logger.info('Debugging info');

// // logger.level = 'verbose';
// // logger.info('Hello verbose');
// logger.verbose('Debugging info');

// // logger.level = 'silly';
// // logger.info('Hello silly');
// logger.silly('Debugging info');

'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});
logger.info('Hello world');
logger.warn('Warning message');
logger.debug('Debugging info');