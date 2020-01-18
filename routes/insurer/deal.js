const express = require('express');
const router = express.Router();

const { Auth } = require('../../utils/auth');
const ClaimForm = require('../../models/owner/claimForm');

router.post('/progress', new Auth(3).m, (req, res) => {
  let { process, insureNum } = req.body;

  ClaimForm.updateOne({ insureNum }, { process }, (err, doc) => {
    if (err) return res.send({ msg: '进度更新失败！请刷新重试' });
    res.send({ msg: '进度更新成功', code: 1 });
  });
});

router.post('/act', new Auth(3).m, (req, res) => {
  let { actmoney, process, insureNum } = req.body;

  ClaimForm.updateOne({ insureNum }, { actmoney, process }, (err, doc) => {
    if (err) return res.send({ msg: '赔付失败！请刷新重试' });
    res.send({ msg: '赔付成功', code: 1 });
  });
});

module.exports = router;