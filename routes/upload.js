var express = require('express');
var router = express.Router();

const upload = require('../node_modules/multer');

router.post('/', upload.single('img'), (req,res) => {
    const img = req.file.location;
    console.log(img); 
});
/*
    파일 전송 시 content-type은 form-data로 지정합니다.
    form-data로 오는 모든 데이터는 string으로 들어오니 적절하게 형변환해서 사용하세요.
    파일 전송할 때 upload 모듈로 받지 않으면 body 값을 인식 못합니다! 빼먹지 말고 꼭 쓰셔야해요!!
*/


module.exports = router;