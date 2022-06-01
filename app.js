var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());


// Routes
app.use('/', authRouter); 
app.use('/', indexRouter);
app.use('/users', usersRouter);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});


module.exports = app;