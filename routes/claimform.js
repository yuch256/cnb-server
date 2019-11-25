const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const ClaimForm = require('../models/claimForm');

var uploadprogress = 0;

router.post('/', (req, res) => {
  // let { name, gend, IDcard, money, phone, birth, type, address, bill, invoice, siteimg } = req.body.values;
  // console.log(JSON.stringify(req.body))

  // // 表单验证
  // if (!/^[\u4e00-\u9fa5]{0,5}[\u4e00-\u9fa5·]{2}[\u4e00-\u9fa5]{0,5}$/.test(name)) {
  //   return res.send({ msg: '姓名格式有误！', state: 'error' });
  // }
  // if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)) {
  //   return res.send({ msg: '身份证号格式有误！', state: 'error' });
  // }
  // if (!/^1[3456789]\d{9}$/.test(phone)) {
  //   return res.send({ msg: '手机号格式有误！', state: 'error' });
  // }
  // if (checkEmpty([gend, money, birth, type, address, bill, invoice, siteimg])) {
  //   return res.send({ msg: '表单未填写完整！', state: 'error' });
  // }

  let newClaimForm = new ClaimForm({
    usr: '',
    name: '',
    date: new Date()
  });

  // 处理上传文件
  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = 'public/img/claimform';
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.maxFields = 30 * 1024 * 1024;

  let allFile = [];
  let uploadprogress = 0;
  console.log('start:upload----' + uploadprogress);

  form
    .on('field', function (field, value) {
      console.log(field + ':' + value);         // 上传的参数数据
      newClaimForm[field] = value;
    })
    .on('file', function (field, file) {        // 上传的文件数据
      allFile.push(file);
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
    .parse(req, function (err, fields, files) {
      if (err) console.log(err)
      allFile.forEach(file => {
        newClaimForm.billimg.push({
          name: file.name.split('.')[0],
          path: file.path,
          size: file.size,
          type: file.type,
        })
      });
      console.log(newClaimForm)
    });

  function addClaimForm() {

  }
});

function checkEmpty(arr) {
  for (let item of arr) {
    if (item.trim() === '') return false
  }
  return true
}

module.exports = router;
