const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { decrypt, encrypt } = require('../../utils/crypto');
const { TIME_JWT, SECRET_JWT } = require('../../utils/config');

const Owner = require('../../models/owner/owner');

router.post('/signin', async (req, res) => {
  let { usr, pwd } = req.body.values;
  console.log(JSON.stringify(req.body))

  let doc = await Owner.findOne({ usr });

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

// 投保人注册
router.post('/signup', async (req, res) => {
  let { usr, email, pwd, rpwd, realname, IDcard, phone, carnum } = req.body.values;
  console.log(JSON.stringify(req.body))

  // 表单验证
  if (!/^\w{5,15}$/.test(usr)) {
    return res.send({ msg: '用户名格式有误！' });
  }
  if (!/[-.\w]+@([\w-]+\.)+[\w-]{2,20}/.test(email)) {
    return res.send({ msg: '邮箱格式有误！' });
  }
  if (!/^\w{6,15}$/.test(pwd)) {
    return res.send({ msg: '密码格式有误！' });
  }
  if (pwd !== rpwd) {
    return res.send({ msg: '密码不相等！' });
  }
  if (!/^[\u4e00-\u9fa5]{0,5}[\u4e00-\u9fa5·]{2}[\u4e00-\u9fa5]{0,5}$/.test(realname)) {
    return res.send({ msg: '姓名格式有误！' });
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)) {
    return res.send({ msg: '身份证号格式有误！' });
  }
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return res.send({ msg: '手机号格式有误！' });
  }
  const carReg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([\d]{5}[DF])|([DF]([A-HJ-NP-Z\d])[\d]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z\d]{4}[A-HJ-NP-Z\d挂学警港澳使领]))$/
  if (!carReg.test(carnum)) {
    return res.send({ msg: '车牌号格式有误！' });
  }

  // pwd加密
  let { r, salt } = await encrypt(pwd);

  // 添加用户
  const newOwner = new Owner({ usr, email, pwd: r, salt, realname, IDcard, phone, carnum });
  newOwner.save((err, doc) => {
    if (err) return res.send({ msg: '注册失败!' });
    res.send({ msg: '注册成功!', code: 1 });
  });
});

module.exports = router;
