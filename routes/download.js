const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const upload = require('./upload');
//aws S3 키 가져오기 
aws.config.loadFromPath(__dirname + '/../config/awsconfig.json');

var s3 = new aws.S3();
//해당 디렉토리에 이미지 저장
var file = require('fs').createWriteStream(__dirname + '/../public/images/image.png');

//버킷이름과 가져올 파일 이름 (추후 변수로 변경)
var params = {
    Bucket:'joymoji.com', 
    Key: '1566817378760.png'};

router.get('/', function(req, res) {
    var output = `
<html>
<body>
    <form enctype="multipart/form-data" method="post" action="upload_receiver">
        <input type="file" name="userfile">
        <input type="submit">
    </form>
</body>
</html>
    `;
    res.send('idontknow');

    s3.getObject(params, function(err, data){
        if(err){
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data.Body, 'form-data');
        res.end(null, 'form-data');
    });
  });

  router.use('/', require(__dirname + '/../public/javascripts/main'));

module.exports = router;