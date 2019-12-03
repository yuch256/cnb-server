const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/db');

const app = express();

const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const claimformRouter = require('./routes/owner/claimform');
const ownerformlistRouter = require('./routes/owner/formlist');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/claimform', claimformRouter);
app.use('/owner/formlist', ownerformlistRouter);

app.get('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('<h1>500</h1>');
});

module.exports = app;
