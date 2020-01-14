const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const decrypt = require('../../utils/crypto').decrypt;
const secret = require('../../utils/config').secret_jwt;
const Owner = require('../../models/owner/owner');
const auth = require('../../utils/auth');

router.get('/', auth, async (req, res) => {
  res.send({ usr: req.curUsr, code: 1 });
});

router.post('/', async (req, res) => {
  let { usr, pwd } = req.body.values;
  console.log(JSON.stringify(req.body))

  // 查询用户
  let doc = await Owner.findOne({ usr });
  console.log(doc.usr)

  if (doc) {
    // 密码校验
    let r = await decrypt(pwd, doc.salt);
    if (r !== doc.pwd) {
      res.send({ msg: '用户名或密码错误！', code: 0 });
    } else {
      const t = jwt.sign({ usr, pwd }, secret, { expiresIn: 5 * 60 });
      res.send({ msg: '登录成功！', code: 1, token: t });
      console.log(`用户${usr}登录成功！`)
    }
  } else {
    res.send({ msg: '用户名或密码错误！', code: 0 });
  }
});

module.exports = router;
