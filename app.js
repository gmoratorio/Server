


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
// const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv').config();


var index = require('./routes/index');
// var users = require('./routes/users');
var events = require('./routes/events');
var categories = require('./routes/category');
var newMember = require('./routes/new_member');
var view = require('./routes/view');
var viewEvent = require('./routes/view_event');
var categoriesEvents = require('./routes/view_categoriesEvents');
const userDashboard = require('./routes/user_dashboard');
const scrape = require('./routes/scrape');
const rss = require('./routes/rss');
const posting = require("./functions/posting");
const environment = require("./functions/environment");
const validation = require("./db/validation");
const dates = require("./functions/dates");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: process.env.CLIENT_CORS_SOURCE,
    credentials: true
}));



app.use(cookieSession({
    secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
        req.user = req.session.passport.user;
    } else if (req.signedCookies.user) {
        req.user = JSON.parse(req.signedCookies.user);
        // console.log(req.user);
    }

    next();
});

function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        console.log("User was not logged in");
        res.status = 401;
        res.redirect(process.env.GUEST_REDIRECT);
    } else {
        console.log("User is logged in!");
        next();
    }
}

app.use('/', index);
// app.use('/users', users);
app.use('/events', events);
app.use('/userDashboard', ensureLoggedIn, userDashboard);
app.use('/category', categories);
app.use('/new_member', newMember);
app.use('/view', view);
app.use('/view_event', viewEvent);
app.use('/view_categoriesEvents', categoriesEvents);
app.use('/scrape', scrape);
app.use('/rss', rss);
// app.use('/myInfo', myInfo);





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
