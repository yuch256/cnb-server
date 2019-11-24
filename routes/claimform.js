const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let { name, gend, IDcard, money, phone, birth, type, address, bill, invoice, siteimg } = req.body.values;
  console.log(JSON.stringify(req.body))

  // 表单验证
  if (!/^[\u4e00-\u9fa5]{0,5}[\u4e00-\u9fa5·]{2}[\u4e00-\u9fa5]{0,5}$/.test(name)) {
    return res.send({ msg: '姓名格式有误！', state: 'error' });
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)) {
    return res.send({ msg: '身份证号格式有误！', state: 'error' });
  }
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return res.send({ msg: '手机号格式有误！', state: 'error' });
  }
  if (checkEmpty([gend, money, birth, type, address, bill, invoice, siteimg])) {
    return res.send({ msg: '表单未填写完整！', state: 'error' });
  }

});

function checkEmpty(arr) {
  for (let item of arr) {
    if (item.trim() === '') return false
  }
  return true
}

module.exports = router;
