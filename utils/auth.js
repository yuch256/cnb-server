const jwt = require('jsonwebtoken');
const secret = require('./config').secret_jwt;

module.exports = function (req, res, next) {
  var t = req.headers.authorization;
  // console.log('token: ' + t)

  if (t) {
    jwt.verify(t, secret, (err, decoded) => {
      // console.log('decoded: ', JSON.stringify(decoded))
      if (err) {
        res.status(401).json({ msg: "Invalid token", code: 0 });
      } else {
        req.curUsr = decoded.usr;
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "No token", code: 0 });
  }
}
