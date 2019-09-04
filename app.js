var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fileUpload = require('express-fileupload')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var UsersApiRouter = require('./routes/api/users')
var FolderApiRouter = require('./routes/api/directories')
var RolesApiRouter = require('./routes/api/roles')
var FilesApiRouter = require('./routes/api/files')
var AuthApiRouter = require('./routes/api/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
require('./utils/auth/strategies/basic')

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/auth', AuthApiRouter)
app.use('/api/users', UsersApiRouter)
app.use('/api/directories', FolderApiRouter)
app.use('/api/roles', RolesApiRouter)
app.use('/api/files', FilesApiRouter)

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
    // res.render('error');
    res.json({
        error: err
    })
});

module.exports = app;