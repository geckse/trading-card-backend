const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const lusca = require('lusca');
const flash = require('express-flash');
const sass = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const cardController = require('./controllers/cards');

/**
 * Express configuration.
 */
const app = express();
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(flash());
app.use((req, res, next) => {
  if (req.path.indexOf('/api/') !== false) {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use((req, res, next) => {
  if (req.path.indexOf('/api/') !== false) {
    next();
  } else {
	lusca.xframe('SAMEORIGIN')(req, res, next);
  }
});
app.use((req, res, next) => {
  if (req.path.indexOf('/api/') !== false) {
    next();
  } else {
	lusca.xssProtection(true)(req, res, next);
  }
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.all('/api/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  /*res.header("Access-Control-Allow-Headers", "X-Requested-With");*/
  next();
});
app.use(function(req, res, next) { req.start = Date.now(); next(); });
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


app.get('/api', cardController.getApi);
app.get('/api/cards', cardController.getAllCards);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;


