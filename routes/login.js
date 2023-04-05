const path = require('path');
const dirname = require('../utls/path')
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.sendFile(path.join(dirname,"view","login.html"))
  });
module.exports = router
  