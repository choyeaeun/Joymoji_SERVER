var express = require('express');
var router = express.Router();

//router.use('/', require(__dirname + '/../public/javascripts/main'));
router.use('/upload', require('./upload'));
router.use('/web', require('./web'));

module.exports = router;