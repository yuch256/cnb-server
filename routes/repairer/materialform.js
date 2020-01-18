const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const MaterialForm = require('../../models/repairer/materialForm');
const { Auth } = require('../../utils/auth');

router.post('/find', new Auth(3).m, (req, res) => {
  let { insureNum } = req.body;

  MaterialForm.find({ insureNum }, (err, doc) => {
    if (err) return res.send({ msg: '查询失败！请刷新重试' });
    res.send({ data: doc, code: 1 });
  });
});

router.post('/', new Auth(2).m, (req, res) => {
  // 根据当前时间、用户创建图片文件夹
  const curUsr = req.curUsr;
  let curPath = `public/img/materialform/${getCurrentTime()}_${curUsr}`;
  let exists = fs.existsSync(curPath);
  if (!exists) fs.mkdir(curPath, (err) => {
    if (err) return res.send({ msg: '提交失败' });
    else upload(req, res, curPath);
  });
});

function upload(req, res, curPath) {
  // 处理上传文件
  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = curPath;
  form.keepExtensions = true;                      // 保留文件后缀
  form.maxFieldsSize = 2 * 1024 * 1024;            // 限制单个文件大小
  form.maxFields = 20 * 1024 * 1024;               // 限制所有文件大小总和

  let newMaterialForm = new MaterialForm();
  let allFile = [];
  let insureNumError = false;

  form.parse(req);

  form
    .on('field', function (field, value) {
      console.log(field + ':' + value)
      if (field === 'insureNum' && !value.split(' ')[1])
        insureNumError = true;
      newMaterialForm[field] = value;
    })
    .on('file', function (field, file) {
      allFile.push(file);
    })
    .on('end', function () {
      if (insureNumError) return res.send({ msg: '保险单号格式有误' });
      allFile.forEach((file, index) => {
        let { name, path, size, type } = file;
        size = `${(size / 1024).toFixed(2)}KB`;

        let invoice = newMaterialForm.img.invoice;
        invoice.push({ name, path, size, Type: type });
        newMaterialForm.img.invoice = invoice;
      });

      newMaterialForm.save((err, doc) => {
        if (err) return res.send({ msg: '申请失败！' });
        res.send({ msg: '申请成功！', code: 1 });
      });
    })
    .on('error', function (err) {
      console.log(err);
      res.send({ msg: '上传失败' });
    });
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

function toPadStart(num, min = 2, char = '0') {
  return num.toString().padStart(min, char);
}

module.exports = router;
