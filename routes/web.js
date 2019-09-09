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
    
        pool.getConnection((err, connection) => {
            connection.query(webQuery, [originalname], (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    //rawData안에 location 접근
                    let imgURL = result[0].location;
                    //html response including imgURL
                    res.send(templateHTML(imgURL));
          connection.release();
        }
      });
    });
}

});

function templateHTML(imgURL){
    return `<!DOCTYPE html>
    <html lang= "en">
        <head>
            <title>JOYMOJI</title>
            <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                position: fixed;
                overflow: hidden;
                width:100%;
                height: 100%;
                max-height: 100%;
                font-family: century gothic;
                line-height: 1.5em;
            }
       #wrap {
             width: 800px;
             height: 100%;
             border : 1px
             solid #cccccc;
             margin:0 auto;
             padding: 5px 10px;
            }
            main {
         margin:0 auto;
                position: fixed;
                top: 100px; /* Set this to the height of the header */
                bottom: 50px; /* Set this to the height of the footer */
                left: 0;
                right: 0;
         text-align: center;
            padding-top:10%;
                overflow: auto;
                background: #EAEAEA;
            }
            h1,h2,h3,h4,h5,h6 {font-family: "century gothic"  }
            <!-- impact/ palatino linotype/ tahoma/ century gothic / lucida sans unicode / arial black / times new roman /
            arial narrow / verdana/ copperplate gothic light/ lucida console/ gill sans / trebuchet ms / courier new / arial / georgia-->
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
                background: #6c5ce7;
            }
            #footer {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 30%;
                background: #7b88ff;
            }
            #nav {
                position: absolute;
                top: 100px;
                bottom: 50px;
                left: 0;
                width: 230px;
                overflow: auto; /* Scrollbars will appear on this frame only when there's enough content to require scrolling. To disable scrollbars, change to "hidden", or use "scroll" to enable permanent scrollbars */
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
            .share-btn {
                 margin-top: 10%;
                 cursor: pointer;
                 }
            </style>
        </head>
        <body>
            <header id="header">
                <div class="innertube">
                    <h1 style="color:#EAEAEA;" align=center  >JOYMOJI-HOME</h1>
                </div>
            </header>
            <main>
            <div class="innertube" vertical-align="middle">
                    <h2 align=center style="color:#353535; ">Your Joymoji!!</h1>
                    <img  src="${imgURL}" style="max-width: 70%; height: auto;" alt="teddy">
            </div>
            <br><br>
                <!--<button class="share-btn">share</button>
                <script>
                const shareBtn = document.querySelector('.share-btn');
                shareBtn.addEventListener('click', () => {
                        
                        if(navigator.share !== undefined){
                            console.log('clicked!');
                            navigator.share({
                                title: "This is my Joymoji!",
                                text: "hey!!",
                                url: "${imgURL}"
                            })
                            .then(() => console.log("Successful share"))
                            .catch((error) => console.log("Error sharing", error));
                        }else{
                            console.log("navigator.share == undefined")
                        }
                    });
                </script>
               -->
            </main>
            <footer id="footer">
         <div class="innertube">
                    <form style="margin:auto; width:60%" action="" target="">
                        <p>On our homepage you can check and share your own emoji.
                        Create more emoji with joymoji.
                        I wish you a joyful day with joymoji.
                        Thank you for using joymoji homepage.
                        </p>
                        <p align= center style="color:#DF4D4D; font-size:110%" >Make fun time with your emoji~@.@</p>
                    </form>
                    <br><br>
                    <p  align=center >Joymoji-Emoji-Homepage</p>
                </div>
            </footer>
        </body>
    </html>
    `
}

module.exports = router;
