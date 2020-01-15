/**
 * 三方公用接口
 */

const express = require('express');
const router = express.Router();

const { Auth } = require('../../utils/auth');

// 身份认证（不含权限认证）
router.get('/', new Auth().m, async (req, res) => {
  res.send({
    usr: req.curUsr,
    scope: req.scope,
    code: 1
  });
});

// 登出
router.get('/signout', (req, res) => {
  res.send({ code: 1 });
});

module.exports = router;
