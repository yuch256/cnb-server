const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const ClaimForm = require('../models/claimForm');
const fs = require('fs');
const auth = require('../utils/auth');

var uploadprogress = 0;

router.get('/', auth, (req, res) => {
  res.send({ state: 'success' })
});

router.post('/', auth, async (req, res) => {
  let { name, gend, IDcard, money, policy, birth, type, address } = req.body.values;
  console.log(JSON.stringify(req.body))

  // 表单验证
  if (!/^[\u4e00-\u9fa5]{0,5}[\u4e00-\u9fa5·]{2}[\u4e00-\u9fa5]{0,5}$/.test(name)) {
    return res.send({ msg: '姓名格式有误！', state: 'error' });
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)) {
    return res.send({ msg: '身份证号格式有误！', state: 'error' });
  }
  if (checkEmpty([gend, money, birth, type, policy, address, bill, invoice, siteimg])) {
    return res.send({ msg: '表单未填写完整！', state: 'error' });
  }

  // 验证表单唯一
  let doc = null
  doc = await Owner.findOne({ policy })
  if (doc) return res.send({ msg: '重复提交！', state: 'error' })

  // db model
  let newClaimForm = new ClaimForm({ gend, money, birth, type, policy, address, bill, invoice, siteimg });
  newClaimForm.save((err, doc) => {
    if (err) return res.send({ msg: '提交失败!', state: 'error' })
    res.send({ msg: '提交成功!', state: 'success' })
  });
});

router.post('/invoice', async (req, res) => {
  // 根据当前时间、用户创建图片文件夹
  const currentUsr = '2560';
  const curPath = `public/img/claimform/${getCurrentTime()}_${currentUsr}`;
  let exists = fs.existsSync(curPath);
  if (!exists) fs.mkdir(curPath, (err) => {
    if (err) console.log(err)
  });

  // 处理上传文件
  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = curPath;
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.maxFields = 30 * 1024 * 1024;

  let uploadprogress = 0;
  console.log('start:upload----' + uploadprogress);

  form.parse(req);

  form
    .on('field', function (field, value) {
      console.log(field + ':' + value);         // 上传的参数数据
      // newClaimForm[field] = value;
    })
    .on('file', function (field, file) {        // 上传的文件数据
      console.log(file.path)
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      uploadprogress = bytesReceived / bytesExpected * 100;         // 计算上传进度
    })
    .on('end', function () {
      // 上传完成
      console.log('-> upload done\n');
      // console.log(fields)
      res.send({ data: 'ok', state: 'success' });
    })
    .on('error', function (err) {
      console.log('上传失败：' + err);
      res.send({ msg: '上传失败', state: 'error' });
    })
  // .parse(req, function (err, fields, files) {
  //   if (err) console.log(err)
  //   allFile.forEach(file => {
  //     newClaimForm.billimg.push({
  //       name: file.name.split('.')[0],
  //       path: file.path,
  //       size: file.size,
  //       type: file.type,
  //     })
  //   });
  //   console.log(newClaimForm)
  // });

  function addClaimForm() {

  }
});

function checkEmpty(arr) {
  for (let item of arr) {
    if (item.trim() === '') return false
  }
  return true
}

function getCurrentTime(time = new Date()) {
  y = time.getFullYear();
  m = toPadStart(time.getMonth() + 1);
  d = toPadStart(time.getDate());
  h = toPadStart(time.getHours());
  f = toPadStart(time.getMinutes());
  s = toPadStart(time.getSeconds());
  return y + m + d + h + f + s
}

function toPadStart(num = 0, min = 2, char = '0') {
  return num.toString().padStart(min, char);
}

module.exports = router;
