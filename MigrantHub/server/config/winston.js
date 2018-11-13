const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
// Logger formatter
const formatMessage = (timestamp, ip, method, url, httpVersion, status, referrer, customMessage, errorMessage) => {
    return `${ip} \"${method} ${url} HTTP/${httpVersion}\" ${status} ${referrer} \"${customMessage}\" \"${errorMessage}\"`;
};
// Logger file format
const myFormatFile = printf(info => {
    return `${info.timestamp} : ${info.level}: ${info.message}`;
});
// Logger console format
const myFormatConsole = printf(debug => {
    return `${debug.timestamp} : ${debug.level}: ${debug.message}`;
});
// Logger log settings
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            timestamp(),
            myFormatFile
        ),
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            timestamp(),
            myFormatConsole
        ),
    },
};
// Create file and console Winston Logger transport
const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
    ],
    exitOnError: false,
});
logger.streamProd = {
    write: function(message, encoding) {
        logger.info(message);
    },
};
logger.streamDev = {
    write: function(message, encoding) {
        logger.debug(message);
    },
};
module.exports = {logger, formatMessage};