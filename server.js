const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/db');

const app = express();

const ownerSignRouter = require('./routes/owner/sign');
const ownerClaimformRouter = require('./routes/owner/claimform');
const ownerHistorylistRouter = require('./routes/owner/historylist');
const repairerSignRouter = require('./routes/repairer/sign');
const repairerMaterialformRouter = require('./routes/repairer/materialform');
const insurerSignRouter = require('./routes/insurer/sign');
const insurerApprovallistRouter = require('./routes/insurer/approvallist');
const insurerDealRouter = require('./routes/insurer/deal');
const verifyIndexRouter = require('./routes/verify/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/owner', ownerSignRouter);
app.use('/owner/claimform', ownerClaimformRouter);
app.use('/owner/historylist', ownerHistorylistRouter);
app.use('/repairer', repairerSignRouter);
app.use('/repairer/materialform', repairerMaterialformRouter);
app.use('/insurer', insurerSignRouter);
app.use('/insurer/approvallist', insurerApprovallistRouter);
app.use('/insurer/deal', insurerDealRouter);
app.use('/verify', verifyIndexRouter);

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
  res.status(500).json({ msg: '意料之外的错误' });
});

module.exports = app;
