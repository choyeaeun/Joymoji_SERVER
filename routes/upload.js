var express = require('express');
var router = express.Router();
const upload = require('../config/multer');
const mysql = require('mysql');
const DBconfig = require('../config/DBconfig');
const config = DBconfig.database;

const pool = mysql.createPool(config);
router.post('/single', upload.single('img'), (req, res) => {
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
                    console.log(result);
                    connection.release();
                }
            });
        });
    }
    console.log(originalname);
    res.json({key: req.file.key, imgURL : req.file.location, originalname : req.file.originalname });

});

module.exports = router;