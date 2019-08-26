const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/awsconfig.json');

var s3 = new aws.S3();
var file = require('fs').createWriteStream('image.png');
var params = {Bucket:'joymoji.com', Key:'s3://joymoji.com/1566817441877.png'};
//const download = require('../node_modules/multer');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    s3.getObject(params, function(err, data){
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    });
  });
  
module.exports = router;