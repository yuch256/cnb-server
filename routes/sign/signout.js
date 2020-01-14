const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ code: 1 });
});

module.exports = router;
