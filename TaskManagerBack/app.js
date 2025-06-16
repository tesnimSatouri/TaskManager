require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const cors = require('cors');
const helmet = require('helmet');

var app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//To connect to DB
var mongo = require("mongoose");
var mongoConn = require("./config/database.json");

console.log("avant la demande de connection dans le code ");

mongo.connect(mongoConn.url).then(() => {
  console.log("connected to db");
}).catch(() => {
  console.log("error connecting to db");
});

console.log("apres la demande de connection dans le code ");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// AJOUTEZ CETTE ROUTE DE TEST ICI ⬇️
app.get('/', (req, res) => {
  res.json({ 
    message: 'API TaskManager fonctionnelle!',
    status: 'Server is running',
    endpoints: {
      auth: '/api/auth',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

app.use('/api/tasks', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', require('./routes/auth'));

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
