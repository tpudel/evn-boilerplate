const logger = require('./helpers/logger.js');

const express = require('express');
const app = express();

const config = require('./config/config.json');

app.listen(config.port, function() {
    logger.warn('test warning');
    logger.error('test error');
    logger.info('Server Running on:' + config.port);
});