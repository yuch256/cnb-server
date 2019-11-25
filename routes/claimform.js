const express = require('express');
const router = express.Router();
const formidable = require('formidable');

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
  
  // 处理上传文件
  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = 'public';
  form.keepExtensions = true;
  form.maxFieldsSize = 30 * 1024 * 1024;

  let path = '';
  let fields = [];
  let uploadprogress = 0;
  console.log('start:upload----' + uploadprogress);

  form.parse(req);

  form
    .on('field', function (field, value) {
      console.log(field + ':' + value);         // 上传的参数数据
    })
    .on('file', function (field, file) {
      path = file.path;                         // 上传的文件数据
      console.log(path);
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      uploadprogress = bytesReceived / bytesExpected * 100;         // 计算上传进度
    })
    .on('end', function () {
      // 上传完成
      console.log('-> upload done\n');
      res.send({ data: path, state: 'success' });
    });
});

function checkEmpty(arr) {
  for (let item of arr) {
    if (item.trim() === '') return false
  }
  return true
}

module.exports = router;
