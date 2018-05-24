const express = require('express');
const logger = require('./logger');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const app = express();

// setup middlewares
setup(app);

// get the intended port number, use port 4000 if not provided
const port = argv.port || process.env.PORT || 4000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port);
});
