const winston = require('winston');
const colors = require('colors/safe');

/**
 * Custom formatted winston logger.
 * @param {string} label - nickname of the file
 * @return {function} logger - the winston logger instance
 */

function init(label) {

    // Special colorized formatting for console output
    const consoleFormat = winston.format.printf(function(info) {
        // sets color based on 'info.level'. If level is undocumented, uses white.
        const color = {
            info: 'green',
            warn: 'yellow',
            error: 'red'
        }[info.level] || 'white';

        // makes formatted timestamp, MM/DD/YY HH:MM:SS AM/PM
        const timestamp = new Date().toLocaleTimeString('en-us', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            second: '2-digit',
            minute: '2-digit',
            hour: '2-digit'
        }).split(',').join(' ');

        return `[${colors.grey(timestamp)}] (${colors.grey(label)}) ${colors[color](info.level.toUpperCase())}: ${info.message}`;
    });

    // Non-colored output for error.log
    const errorFormat = winston.format.printf(function(info) {
        const timestamp = new Date().toLocaleTimeString('en-us', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            second: '2-digit',
            minute: '2-digit',
            hour: '2-digit'
        }).split(',').join(' ');

        return `[${timestamp}] (${label}) ${info.level.toUpperCase()}: ${info.message}`;
    });

    // Logger instance
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ format: consoleFormat }),
            new winston.transports.File({ format: errorFormat, filename: 'app/logs/error.log', level: 'error' })
        ]
    });
    
    return logger;
}

module.exports = init;