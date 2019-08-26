var express = require('express');
var router = express.Router();

router.use('/upload', require('./upload'));
router.use('/download',require('./download'));
router.use('/qrcode', require('./qrcode'));

module.exports = router;
