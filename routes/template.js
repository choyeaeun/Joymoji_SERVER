module.exports = {
  HTML:function(title){
    return `
    <!DOCTYPE html>
<html lang= "en">

    <head>
 	<meta charset="utf-8">

	<title>JOYMOJI</title>
	<meta name="viewport" content ="width= device-width ,initial-scale=1">

	<link rel="stylesheet" href="normalize.css">

	<style>
	@media screen and (max-width:767px ) {
			#wrap {background-color:#B2EBF4;   }
		}

		@media screen and (max-width:768px) and (max-width:959px) {
			#wrap {background-color:#CEF279; }
		}

		@media screen and (min-width:960px) {
			#wrap {background-color: #FFE08C;   }
		}


		<!--*{margin:10; padding:10px}-->
		li {list-style:none;}


		#wrap {
		 width: 800px;
		 height: auto;
		 border: 1px
		 solid #cccccc;
		 margin:  0 auto;
		 padding: 10px 10px;
		 text-align= center;

		}

		#header{
		 background-color:#CF3682;

		 border:1px
		 solid #3F0099;
		 height:100px
		}

		#header> h1 {
		 text-align: center;
		}

		#nav {
		 border:1px
		 solid #3F0099;
		 background-color:#D1B2FF;
		}

		#nav ul {
		 overflow: hidden
		 }

		#nav ul li {
		 float:left;
		 padding:10px 70px;
		  }

		#content-wrap {
		 border:1px
		 solid #3F0099;
		 }

		#content-wrap #content {
		 padding:10px;
		}

		#content-wrap #content >h2  {
		border -botton:1px
		}

		#footer {
		 background-color:#cccccc;
		 border:1px
		 solid #3F0099;
		 height:20px;
		 line-height:10px;
		 text-align: center

		}

		</style>



    </head>
    <body>

        <div id="wrap" >

	<div id="header" >
		<h1 >JOYMOJI-Home</h1>
	</div>

	<div id="nav">
		<ul>
			<li>image</li>
			<li>mp4</li>
			<li>gif</li>
			<li>total</li>
		</ul>
	</div>

	<div id ="content-wrap"  align=center>
		<div id="content" >
			<h2>JOYMOJI</h2>
			<p> image</p>
			<p> mp4</p>
			<p> gif </p>
			<p> total</p>


	</div>
	</div>



	<div id ="footer"  >

		<footer>joymoji-emoji-share</footer>
	</div>

</div>
	<!--<script src="js/jquery-3.1.0.min.js"></script> -->
    </body>
</html>

    `;
  }
}
