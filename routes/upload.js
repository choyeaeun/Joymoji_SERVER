var express = require('express');
var router = express.Router();

const upload = require('../config/multer');

const mysql = require('mysql');
const DBconfig = require('../config/DBconfig');
const config = DBconfig.database;

const qr = require('qr-image');
const fs = require('fs');
const qrcode = require('qrcode');

const pool = mysql.createPool(config);
router.post('/', upload.single('img'), (req, res) => {
    let originalname = req.file.originalname;
    let key = req.file.key;
    let location = req.file.location;
    
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

    let qr_txt = `http://15.164.204.212:5252/qrcode/?originalname=${originalname}`;
    var code = qr.image(qr_txt, { type : 'png'})
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);
    /*
    var qr_png = qr.imageSync(qr_txt, {type : 'png'});
    let qr_code_file_name = new Date().getTime() + '.png';
    fs.writeFileSync('../public/images/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }
    });
    res.send({'qr_img' : "qr" + qr_code_file_name});
    //res.json({key: req.file.key, imgURL : req.file.location, originalname : req.file.originalname });

    qrcode.toDataURL(`http://15.164.204.212:5252/qrcode/?originalname=${originalname}`, function(err, url){
        fs.writeFileSync(__dirname + '/../public/images/'+ new Date().getTime() + '.png', `<img src="${url}">`);
    });
    res.send({'qr_img' : "qr" + __dirname + '/../public/images/'+ new Date().getTime() + '.png'});
*/
});
module.exports = router;