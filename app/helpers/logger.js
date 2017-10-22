const winston = require('winston');
const colors = require('colors/safe');

const infoFormat = winston.format.printf(info => {
    console.log(info)
    const color = {
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }[info.level] || 'white';

    const timestamp = new Date().toLocaleTimeString('en-us', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        second: '2-digit',
        minute: '2-digit',
        hour: '2-digit'
    }).split(',').join(' ');

    return `[${colors.grey(timestamp)}] ${label} ${colors[color](info.level.toUpperCase())}: ${info.message}`;
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ format: infoFormat })
    ]
});

module.exports = logger;