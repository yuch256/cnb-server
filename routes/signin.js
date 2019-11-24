const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../utils/config').secret;

router.post('/', (req, res) => {
  let { usr, pwd } = req.body.values;
  console.log(JSON.stringify(req.body))

  const Owner = require('../models/owner');
  Owner.findOne({ usr, pwd }, (err, doc) => {
    if (err) return res.send({ msg: '登录失败', state: 'error' })
    if (doc) {
      const t = jwt.sign({ usr, pwd }, secret, { expiresIn: 60 })
      res.send({ msg: '登录成功', state: 'success', token: t })
    } else {
      res.send({ msg: '登录失败', state: 'error' })
    }
  });
});

module.exports = router;
