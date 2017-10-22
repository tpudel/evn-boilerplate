const logger = require('./helpers/logger.js')('server.js');

const express = require('express');
const app = express();

const config = require('./config/config.json');


// Router File =================================
const routes = require('./routes/routes.js');
app.use('/', routes);

// Start ya engines! ===========================
app.listen(config.port, function() {
    logger.warn('test warning');
    logger.error('test error');
    logger.info('Server Running on:' + config.port);
});