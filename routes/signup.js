const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send({
    message: null,
    status: 'success'
  });
});

module.exports = router;
