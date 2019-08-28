var express = require('express');
var router = express.Router();

const upload = require('../config/multer');

router.post('/single', upload.single('img'), (req, res) => {
    //const key = req.file.key;
    //console.log(req);
    //console.log(res.json({'key' : key, 'imageUrl' : req.file.location}));
    //res.send({'key' : key, 'imageUrl' : req.file.location})
    console.log(req.file);
});

module.exports = router;