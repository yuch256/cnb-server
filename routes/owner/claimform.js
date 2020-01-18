const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const ClaimForm = require('../../models/owner/claimForm');
const { Auth } = require('../../utils/auth');

let uploadprogress = 0;

router.post('/', new Auth(1).m, (req, res) => {
  // 根据当前时间、用户创建图片文件夹
  const curUsr = req.curUsr;
  let curPath = `public/img/claimform/${getCurrentTime()}_${curUsr}`;
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
  // 初始化理赔model
  let newClaimForm = new ClaimForm();

  let uploadprogress = 0;
  let allFile = [];
  let divide = 0;
  let insureNumError = false;
  console.log('start:upload----' + uploadprogress);

  form.parse(req);                              // 加上回调可以在这里做文件重命名之类的

  form
    .on('field', function (field, value) {      // 上传的参数数据
      if (field === 'divide') divide = value;   // 两种图片site和invoice的分界
      if (field === 'insureNum' && !value.split(' ')[1])
        insureNumError = true;
      else newClaimForm[field] = value;
      console.log(field + ':' + value);
    })
    .on('file', function (field, file) {        // 上传的文件数据
      allFile.push(file);
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      uploadprogress = bytesReceived / bytesExpected * 100;         // 计算上传进度
    })
    .on('end', function () {                    // 上传完成
      console.log('-> upload done\n');
      if (insureNumError) return res.send({ msg: '保险单号格式有误' });
      allFile.forEach((file, index) => {        // 遍历上传文件存入model
        let { name, path, size, type } = file;
        size = `${(size / 1024).toFixed(2)}KB`;
        if (index > divide) {                   // invoice图片
          let invoice = newClaimForm.img.invoice;
          invoice.push({ name, path, size, Type: type });
          newClaimForm.img.invoice = invoice;
        } else {
          let site = newClaimForm.img.site;
          site.push({ name, path, size, Type: type });
          newClaimForm.img.site = site;
        }
      });
      newClaimForm.usr = req.curUsr;
      newClaimForm.save((err, doc) => {         // model存入db
        if (err) return res.send({ msg: '申请失败！' });
        console.log(JSON.stringify(doc, null, 2))
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
