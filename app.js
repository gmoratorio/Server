var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var index = require('./routes/index');
// var users = require('./routes/users');
var events = require('./routes/events');
var categories = require('./routes/category');
var newMember = require('./routes/new_member');
var view = require('./routes/view');
var viewEvent = require('./routes/view_event');
var categoriesEvents = require('./routes/view_categoriesEvents');
const scrape = require('./routes/scrape');
const rss = require('./routes/rss');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', index);
// app.use('/users', users);
app.use('/events', events);
app.use('/category', categories);
app.use('/new_member', newMember);
app.use('/view', view);
app.use('/view_event', viewEvent);
app.use('/view_categoriesEvents', categoriesEvents);
app.use('/scrape', scrape);
app.use('/rss', rss);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
