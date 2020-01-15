const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { decrypt, encrypt } = require('../../utils/crypto');
const { TIME_JWT, SECRET_JWT } = require('../../utils/config');

const Repairer = require('../../models/repairer/repairer');

router.post('/signin', async (req, res) => {
  let { usr, pwd } = req.body.values;
  console.log(JSON.stringify(req.body))

  let doc = await Repairer.findOne({ usr });

  if (doc) {
    let r = await decrypt(pwd, doc.salt);
    if (r !== doc.pwd) {
      res.send({ msg: '用户名或密码错误！' });
    } else {
      const t = jwt.sign({ usr, scope: doc.scope }, SECRET_JWT, { expiresIn: TIME_JWT });
      res.send({ msg: '登录成功！', code: 1, token: t });
      console.log(`用户${usr}登录成功！类别${doc.scope}`)
    }
  } else {
    res.send({ msg: '用户名或密码错误！' });
  }
});

router.post('/signup', async (req, res) => {
  let { usr, pwd } = req.body;
  console.log(JSON.stringify(req.body))

  // 表单验证
  if (!/^\w{5,15}$/.test(usr)) {
    return res.send({ msg: '用户名格式有误！' });
  }
  if (!/^\w{6,15}$/.test(pwd)) {
    return res.send({ msg: '密码格式有误！' });
  }

  let { r, salt } = await encrypt(pwd);

  const newRepairer = new Repairer({ usr, pwd: r, salt });
  newRepairer.save((err, doc) => {
    if (err) return res.send({ msg: '注册失败!' });
    res.send({ msg: '注册成功!', code: 1 });
  });
});

module.exports = router;
