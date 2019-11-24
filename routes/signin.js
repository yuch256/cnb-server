const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../utils/config').secret;

router.post('/', (req, res) => {
  let { usr, pwd } = req.body.values;

  const Owner = require('../models/owner');
  Owner.findOne({ usr, pwd }, (err, doc) => {
    if (doc) {
      const t = jwt.sign({ usr, pwd }, secret, { expiresIn: 60 })
      res.send({ msg: '登录成功', status: 'success', token: t })
    } else {
      res.send({ msg: '登录失败', status: 'error' })
    }
  });
});

module.exports = router;
