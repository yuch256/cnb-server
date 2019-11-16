const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/user');
// var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'assets')));

// app.use('/users', usersRouter);
let newUser = new User({
  name: 9,
  age: '6',
  IDcard: '7',
});
newUser.speak();

newUser.save((err, newUser) => {
  if (err) console.log(err)
  else console.log(newUser)
});

User.find((err, users) => {
  if (err) console.error(err)
  else console.log(users.length)
});

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
  res.render('error');
});

module.exports = app;
