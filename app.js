const // core and 3rd party modules
    createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    debug = require('debug')('todo:app'),
    validator = require('express-validator');

// initate configs
dotenv.config();

const // local modules
    routers = require('./routes'),
    config = require('./configs'),
    errors = require('./lib/errors');

// init mongodb database
mongoose.connect(config.MONGODB.URL, config.MONGODB.OPTS);

// MongoDB error handler
mongoose.connection.on('error', errors.mongoError);

mongoose.connection.on('open', () => {
    // we're connected!
    debug("Databse successfully connected!");
});
// MongoDB Disconnection handler
mongoose.connection.on('disconnected', () => {
    debug("Retrying to connect with the mongodb...")
    mongoose.connect(config.MONGODB.URL, config.MONGODB.OPTS);
});

// initiate express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// outline default middlewares
app.use(logger('dev')); // logging requests
app.use(express.json()); // write to req.body on "application/json" Content-Type requests
app.use(express.urlencoded({ extended: false })); // format x-www-form-urencoded requests
app.use(cookieParser()); // handle cookies 

// Static Routes
app.use('/docs', express.static(path.join(__dirname, 'docs'))); // API documentation
app.use(express.static(path.join(__dirname, 'public'))); // Define static path to your project


// app.use(validator());
// direct routers
routers(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;