const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const ClaimForm = require('../../models/owner/claimForm');

router.get('/', async (req, res) => {
  let allform = await ClaimForm.find();
  let resform = [];

  try {
    allform.forEach((value, index) => {
      resform.push({
        index,
        insureNum: value.insureNum,
        claimTime: value.updatedAt,
        actmoney: value.actmoney
      });
    });

    res.send({ list: resform, state: 'success' });
  } catch (err) {
    res.send({ msg: '查询失败', state: 'error' });
  }
});

module.exports = router;
