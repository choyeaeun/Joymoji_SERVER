const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
//aws S3관련 키 가져오기 
aws.config.loadFromPath(__dirname + '/../config/awsconfig.json');

var s3 = new aws.S3();
//해당 디렉토리에 이미지 저장
var file = require('fs').createWriteStream(__dirname + '/../public/images/image.png');

//버킷이름과 가져올 파일 이름 (추후 변수로 변경)
var params = {
    Bucket:'joymoji.com', 
    Key:'s3://joymoji.com/1566817378760.png'};
//const download = require('../node_modules/multer');

router.get('/', function(req, res) {
    res.send('respond with a resource');
    s3.getObject(params, function(err, data){
        if(err){
            console.log("err!");
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    });
  });
  
module.exports = router;