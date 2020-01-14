const jwt = require('jsonwebtoken');
const secret = require('./config').secret_jwt;

class Auth {
  constructor(scope) {
    this.scope = scope || 1
  }

  get m() {
    return async (req, res, next) => {
      const t = req.headers.authorization;
      let msg = 'Invalid token'
      let decoded

      if (!t) {
        return res.status(401).json({ msg: "No token", code: 0 });
      }

      try {
        decoded = jwt.verify(t, secret);
      } catch (error) {
        // 令牌不合法或者令牌过期
        if (error.name === 'TokenExpiredError') {
          msg = 'Expired token'
        }
        return res.status(401).json({ msg, code: 0 });
      }

      if (decoded.scope !== this.scope) {
        return res.status(401).json({ msg: "没有权限", code: 0 });
      }

      req.curUsr = decoded.usr;
      next();
    }
  }
}

module.exports = { Auth }
