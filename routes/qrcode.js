var express = require('express');
var router = express.Router();
const qr = require('qr-image');
const fs = require('fs');

/* GET users listing. */
router.post('/', (req, res, next)=>{

  console.log(req.body);
  let qr_txt = req.body.qr_txt;
  var qr_png = qr.imageSync(qr_txt, {type: 'png'})
  let qr_code_file_name = new Date().getTime() + '.png';
  fs.writeFileSync('/../public/images/'+qr_code_file_name, qr_png, (err)=> {
    if(err){
      console.log(err);
    }
  })
  res.send({
    'qr_img' : "qr" + qr_code_file_name
  });
});

module.exports = router;
