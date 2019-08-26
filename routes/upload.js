var express = require('express');
var router = express.Router();

const upload = require('../config/multer');

router.post('/single', upload.single('img'), (req, res) => {
    const img = req.file.location;
    console.log(img);
    console.log(res.json({'imageUrl' : req.file.location}));
});

module.exports = router;