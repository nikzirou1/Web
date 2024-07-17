var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

var authUtils = require('./utils/authUtils')
var indexRouter = require('./routes/index');
var carRouter = require('./routes/carRoute');
var engineRouter = require('./routes/engineRoute');
var ownerRouter = require('./routes/ownerRoute');
var orderRouter = require('./routes/orderRoute')
var stationRouter = require('./routes/stationRoute')

var app = express();

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use(cookieParser());

i18n.configure({
   locales: ['pl', 'en'], 
   defaultLocale: 'pl',
   directory: path.join(__dirname, 'locales'), 
   objectNotation: true, 
   cookie: 'acme-hr-lang', 
});
app.use(i18n.init);

app.use((req, res, next) => {
    let lang = req.cookies['acme-hr-lang'];
    if (!lang)
        res.cookie('acme-hr-lang', 'pl');
    next();
});
app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

const ownerApiRoute = require('./routes/api/OwnerApiRoute');
app.use('/api/owners', ownerApiRoute);
const engineApiRoute = require('./routes/api/EngineApiRoute');
app.use('/api/engines', engineApiRoute);
const carApiRoute = require('./routes/api/CarApiRoute');
app.use('/api/cars', carApiRoute);
const orderApiRouter = require('./routes/api/OrderApiRoute')
app.use('/api/orders', orderApiRouter);
const stationApiRouter = require('./routes/api/StationApiRoute');
app.use('/api/stations', stationApiRouter);
const sequelizeInit = require('./config/sequelize/init');
const { request } = require('http');
sequelizeInit()
    .catch(err =>
    {
        console.log(err);
    }
    );



app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next ();
    
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cars', carRouter);
app.use('/engines', engineRouter);

app.use('/owners', authUtils.permitAuthenticatedUser, ownerRouter);
app.use('/orders', authUtils.permitAuthenticatedUser, orderRouter );
app.use('/stations', stationRouter );

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
