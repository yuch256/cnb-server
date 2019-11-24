const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  let { usr, pwd } = req.body

  const Owner = require('../models/owner');
  Owner.findOne({ usr, pwd }, (err, doc) => {
    if (doc) {
      const t = jwt.sign({ usr, pwd }, secret, { expiresIn: 60 })
      res.send({ message: '登录成功', status: 'success', token: t })
    } else {
      res.send({ message: '登录失败', status: 'error' })
    }
  });
});

module.exports = router;
