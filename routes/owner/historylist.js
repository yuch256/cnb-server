const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const ClaimForm = require('../../models/owner/claimForm');

router.get('/', auth, async (req, res) => {
  ClaimForm.find({ usr: req.curUsr }, (err, doc) => {
    if (err) return res.send({ msg: '查询失败！', code: 0 });

    console.log(`投保人${req.curUsr }共有历史理赔记录${doc.length}条`)
    res.send({ data: doc, code: 1 });
  });
});

module.exports = router;
