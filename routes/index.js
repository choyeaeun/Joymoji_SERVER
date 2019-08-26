var express = require('express');
var router = express.Router();
/*const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "joymoji.com",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
})

router.post('/upload', upload.single("imgFile"), function(req, res, next){
  let imgFile = req.file;
  res.json(imgFile);
})

router.post('/post/img', upload.single('img'), (req, res) => {
  try {
      console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음 

      let payLoad = { url: req.file.location };
      response(res, 200, payLoad);
  } catch (err) {
      console.log(err);
      response(res, 500, "서버 에러")
  }
});
router.get('/upload', function(req, res, next) {
  res.render('upload');
});

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.use('/upload', require('./upload'));
router.use('/download',require('./download'));
router.use('/qrcode', require('./qrcode'));

module.exports = router;
