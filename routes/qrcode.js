var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const DBconfig = require('../config/DBconfig');
const config = DBconfig.database;
const pool = mysql.createPool(config);

router.get('/', function(req, res, next) {

  let originalname = req.query.originalname;  
  if(!originalname){
    res.status(400).send({
      message : "Null Value : originalname"
    });
  } else {
    let webQuery = 'SELECT location FROM media WHERE originalname = ?';
    //let webResult = await db.queryParam_Arr(webQuery, [originalname]);
    
    pool.getConnection((err, connection) => {
      connection.query(webQuery, [originalname], (err, result) => {
        if(err){
          console.log(err);
        }else{
          //console.log(result[0].location);
          let imgURL = result[0].location;
          res.send(`
    <!DOCTYPE html>
    <html lang= "en">
      <head>
          <title>JOYMOJI</title>
          <style type="text/css">
          body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              height: 100%;
              max-height: 100%;
              font-family: malgun gothic ;
              line-height: 1.5em;
          }
     #wrap {
           width: 800px;
           height: 100%
           border: 1px
           solid #cccccc;
           margin:0 auto;
           padding: 5px 10px;
          }
          main {
       margin:0 auto;
              position: fixed;
              top: 100px; 
              bottom: 50px; 
              left: 230px;
              right: 0;
       text-align: center;
              overflow: auto;
              background: #E8D9FF;
          }
     #inner_wrap{
          position: relative;
          margin:0;
          padding:7px;
      }
          #header {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100px;
              background: #8041D9;
          }
          #footer {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 50px;
              background: #A465FD;
          }
          #nav {
              position: absolute;
              top: 100px;
              bottom: 50px;
              left: 0;
              width: 230px;
              overflow: auto; 
              background: #DB8ED1;
          }
          .innertube {
              margin: 15px;
          }
          p {
              color: #cccccc;
          }
     li {
       list-style:none;
     }
          nav ul {
              list-style-type: none;
              margin: 0;
              padding: 0;
          }
          nav ul a {
              color: #ffffff;
          }
     /IE6 fix/
           * html body{
               padding: 50px 0 50px 230px; 
           }
           * html main{
               height: 100%;
               width: 100%;
           }
          </style>
      </head>
      <body>
          <header id="header">
              <div class="innertube">
                  <h1 align=center>JOYMOJI-HOME</h1>
              </div>
          </header>
          <main>
              <div class="innertube">
                  <h1 align=center>data position</h1>
         <img src="${imgURL}">
              </div>
          </main>
          <nav id="nav">
              <div class="innertube">
                  <h1>Data-Type</h1>
                  <ul>
                      <li><a href="#">image</a></li>
                      <li><a href="#">mp4</a></li>
                      <li><a href="#">GIF</a></li>
                      <li><a href="#">total 4</a></li>
                  </ul>
              </div>
          </nav>
          <footer id="footer">
       <div class="innertube">
                  <p align=center>jomoji-emoji-homepage</p>
              </div>
          </footer>
      </body>
  </html>
  `);
          connection.release();
        }
      });
    });
    //console.log(webResult);
}

});


module.exports = router;
