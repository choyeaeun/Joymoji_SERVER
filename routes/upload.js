var express = require('express');
var router = express.Router();

const upload = require('../config/multer');

router.post('/single', upload.single('img'), (req, res) => {
    //console.log(req.file);

    res.json({key: req.file.key, imgURL : req.file.location });
});

module.exports = router;