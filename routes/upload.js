var express = require('express');
var router = express.Router();
//upload to S3
const upload = require('../config/multer');
//use RDS
const mysql = require('mysql');
const DBconfig = require('../config/DBconfig');
const config = DBconfig.database;
const pool = mysql.createPool(config);
//create qrcode image
const qr = require('qr-image');

router.post('/', upload.single('img'), (req, res) => {
    let originalname = req.file.originalname;
    let key = req.file.key;
    let location = req.file.location;
    //save to DB
    if(originalname == null){
        res.status(400).send({
            message : "Null value"
        });
    }else {
        let uploadQuery = 'INSERT INTO media VALUES (?,?,?)';
        
        pool.getConnection((err, connection)=> {
            connection.query(uploadQuery, [originalname, key, location], (err, result) => {
                if (err){
                    console.log(err);
                }else {
                    //console.log(result);
                    connection.release();
                }
            });
        });
    }
    console.log(originalname);
    
    //create QRcode from URL
    let qr_txt = `https://joymoji.ml/web/?originalname=${originalname}`;
    var code = qr.image(qr_txt, { type : 'png'})
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);
});
module.exports = router;