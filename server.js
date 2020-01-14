const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/db');

const app = express();

const signupRouter = require('./routes/sign/signup');
const signinRouter = require('./routes/sign/signin');
const signoutRouter = require('./routes/sign/signout');
// const ownerClaimformRouter = require('./routes/owner/claimform');
// const ownerHistorylistRouter = require('./routes/owner/historylist');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);
// app.use('/owner/claimform', ownerClaimformRouter);
// app.use('/owner/historylist', ownerHistorylistRouter);

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
  res.send({ msg: '一个预料之外的错误' });
});

module.exports = app;
