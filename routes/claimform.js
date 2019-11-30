const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const ClaimForm = require('../models/claimForm');
const auth = require('../utils/auth');

var uploadprogress = 0;

router.get('/', auth, (req, res) => {
  res.send({ currentUsr: req.currentUsr, state: 'success' })
});

router.post('/', async (req, res) => {
  // 根据当前时间、用户创建图片文件夹
  const currentUsr = '2560';
  let curPath = `public/img/claimform/${getCurrentTime()}_${currentUsr}`;
  let exists = fs.existsSync(curPath);
  if (!exists) fs.mkdir(curPath, (err) => {
    if (err) console.log(err)
    fs.mkdir(`${curPath}/invoice`, (err) => {
      if (err) console.log(err)
      // let newClaimForm = new ClaimForm({})
      upload(req, res, `${curPath}/invoice`)
    });
  });
});



function upload(req, res, curPath) {
  // 处理上传文件
  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = curPath;
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.maxFields = 20 * 1024 * 1024;
  // 初始化理赔model
  let newClaimForm = new ClaimForm()

  let uploadprogress = 0;
  let allFile = [];
  console.log('start:upload----' + uploadprogress);

  form
    .on('field', function (field, value) {      // 上传的参数数据
      newClaimForm[field] = value;
      console.log(field + ':' + value);
    })
    .on('file', function (field, file) {        // 上传的文件数据
      console.log(field)
      allFile.push(file);
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      uploadprogress = bytesReceived / bytesExpected * 100;         // 计算上传进度
    })
    .on('end', function () {
      // 上传完成
      console.log('-> upload done\n');
      allFile.forEach(file => {
        let { name, path, size, type } = file;
        let invoice = newClaimForm.img.invoice;
        invoice.push({ name, path, size, Type: type });
        newClaimForm.img.invoice = invoice;
      });
      newClaimForm.save((err, doc) => {
        if (err) return console.log(err)
        console.log(JSON.stringify(doc))
        res.send({ state: 'success' });
      });
    })
    .on('error', function (err) {
      console.log('上传失败：' + err);
      res.send({ msg: '上传失败', state: 'error' });
    })
    .parse(req);
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
