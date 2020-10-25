var createError = require('http-errors');
var express = require('express');
var debug = require('debug')('new-project:server');
var http = require('http');
var path = require('path');
var config = require('config');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var about = require('./routes/about');
var businessContact = require('./routes/businessContact');
var project = require('./routes/project');
var service = require('./routes/service');
var login = require('./routes/login');
var businessContactList = require('./routes/businessContactList');
var contactUS = require('./routes/contactUs');
var auth = require('./routes/auth');
var create = require('./routes/create');
var app = express();


//async function to connect to mongodb
async function connectDb(){
  try{
    const result = await mongoose.connect(config.get('db'),{ useNewUrlParser: true, useUnifiedTopology: true });
    if(result) console.log('connected successfully');
  }catch(ex){
    console.log(ex);
    process.exit(1);
  }
}

//call to function
connectDb();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', about);
app.use('/auth',auth);
app.use('/contactUs', contactUS);
//app.use('/', userRouter);
app.use('/project', project);
app.use('/service', service);
app.use('/login',login);
app.use('/create',create);
app.use('/businessContactList',businessContactList);
app.use('/businessContact',businessContact);

app.post("/",function(req, res){
// const fname = req.body.fname;
// const lname = req.body.lname;
// const email = req.body.email;
  res.render("index");
});


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


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

