const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const decrypt = require('../utils/crypto').decrypt;
const secret = require('../utils/config').secret;

router.post('/', async (req, res) => {
  let { usr, pwd } = req.body.values;
  console.log(JSON.stringify(req.body))

  const Owner = require('../models/owner');
  let doc = await Owner.findOne({ usr })
  console.log(doc)
  if (doc) {
    let r = await decrypt(pwd, doc.salt);
    if (r !== doc.pwd) {
      res.send({ msg: '密码错误', state: 'error' })
    } else {
      const t = jwt.sign({ usr, pwd }, secret, { expiresIn: 60 })
      res.send({ msg: '登录成功', state: 'success', token: t })
    }
  } else {
    res.send({ msg: '用户不存在', state: 'error' })
  }
});

module.exports = router;
