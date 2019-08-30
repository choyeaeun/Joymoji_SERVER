var express = require('express');
var router = express.Router();

const upload = require('../config/multer');

router.post('/single', upload.single('img'), (req, res) => {
    //console.log(req.file);
    const originalname = req.file.originalname;
    console.log(originalname);
    res.json({key: req.file.key, imgURL : req.file.location, originalname : req.file.originalname });
   
});

module.exports = router;