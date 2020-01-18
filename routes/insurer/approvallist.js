const express = require('express');
const router = express.Router();

const { Auth } = require('../../utils/auth');
const ClaimForm = require('../../models/owner/claimForm');

router.get('/', new Auth(3).m, async (req, res) => {
  ClaimForm.find((err, doc) => {
    if (err) return res.send({ msg: '查询失败！请刷新重试' });

    console.log(`共有理赔申请记录${doc.length}条`)
    res.send({ data: doc, code: 1 });
  });
});

module.exports = router;
