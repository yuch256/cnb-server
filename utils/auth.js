const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

module.exports = function (req, res, next) {
  var t = req.headers.authorization;

  console.log('auth ' + t)

  if (t) {
    jwt.verify(t, secret, (err, decoded) => {
      console.log(decoded)
      if (err) {
        console.log(err)
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        req.currentUser = decoded.usr;
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
}