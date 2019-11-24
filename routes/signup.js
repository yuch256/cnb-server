const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let { usr, email, pwd, rpwd, realname, IDcard, phone, carnum } = req.body;
  console.log(JSON.stringify(req.body))
  // 表单验证
  if (!/^\w{5,15}$/.test(usr)) {
    return res.send({ msg: '用户名格式有误！', state: 'error' });
  }
  if (!/[-.\w]+@([\w-]+\.)+[\w-]{2,20}/.test(email)) {
    return res.send({ msg: '邮箱格式有误！', state: 'error' });
  }
  if (!/^\w{6,15}$/.test(pwd)) {
    return res.send({ msg: '密码格式有误！', state: 'error' });
  }
  if (pwd !== rpwd) {
    return res.send({ msg: '密码不相等！', state: 'error' });
  }
  if (!/^[\u4e00-\u9fa5]{0,5}[\u4e00-\u9fa5·]{2}[\u4e00-\u9fa5]{0,5}$/.test(realname)) {
    return res.send({ msg: '姓名格式有误！', state: 'error' });
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)) {
    return res.send({ msg: '身份证号格式有误！', state: 'error' });
  }
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return res.send({ msg: '手机号格式有误！', state: 'error' });
  }
  const carReg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([\d]{5}[DF])|([DF]([A-HJ-NP-Z\d])[\d]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z\d]{4}[A-HJ-NP-Z\d挂学警港澳使领]))$/
  if (!carReg.test(carnum)) {
    return res.send({ msg: '车牌号格式有误！', state: 'error' });
  }

  // 用户查重
  const Owner = require('../models/owner');

  // checkOwner(Owner, { email, realname, IDcard, phone, carnum })
  Owner.findOne({ email }, (err, doc) => {
    if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
  });
  Owner.findOne({ realname }, (err, doc) => {
    if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
  });
  Owner.findOne({ IDcard }, (err, doc) => {
    if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
  });
  Owner.findOne({ phone }, (err, doc) => {
    if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
  });
  Owner.findOne({ carnum }, (err, doc) => {
    if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
  });

  // 添加用户
  const newOwner = new Owner({ usr, email, pwd, realname, IDcard, phone, carnum, });
  newOwner.save((err, doc) => {
    if (err) return res.send({ msg: '注册失败!', state: 'error' })
    res.send({ msg: '注册成功!', state: 'success' })
  });
});

function checkOwner(model, obj) {
  for (let [k, v] of Object.entries(obj)) {
    model.findOne({ k: v }, (err, doc) => {
      if (doc) return res.send({ msg: '用户已注册！', state: 'error' })
    });
  }
}

module.exports = router;
