const express = require('express');
const path = require('path');
const compression = require('compression');
const apiProvider = require('./../apiProvider');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;


  app.get('/reactive/shop/desktop/build/fonts/:fileName', (req, res) => {
    const filePath = path.join(process.cwd(), pkg.fontsPath, req.params.fileName.replace(/^\//, ''));
    res.sendFile(filePath);
  });

  app.get('/reactive/shop/desktop/build/images/:fileName', (req, res) => {
    const filePath = path.join(process.cwd(), pkg.imagesPath, req.params.fileName.replace(/^\//, ''));
    res.sendFile(filePath);
  });

  // Added endpoint listeners for mock APIs (GET/POST)
  app.get('/od/cust/auth/*', (req, res) => {
    res.json(apiProvider.getApiResponse(req.originalUrl));
  });


  app.post('/od/cust/auth/*', (req, res) => {
    res.json(apiProvider.getApiResponse(req.originalUrl));
  });

  app.get('/content/wcms/one-digital/global-header/*', (req, res) => {
    res.json(apiProvider.getApiResponse(req.originalUrl));
  });

  app.get('/content/wcms/one-digital/global-footer/*', (req, res) => {
    res.json(apiProvider.getApiResponse(req.originalUrl));
  });


  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};



/**
 * Front-end middleware
 */
module.exports = (app) => {
  const webpackConfig = require('../../internals/webpack/webpack.nodedev.config');
  addDevMiddlewares(app, webpackConfig);

  return app;
};
