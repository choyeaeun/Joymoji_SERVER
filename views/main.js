var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../routes/template.js/index.js');
//const host='172.31.34.55';
//const port=5252;

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;


      if(queryData.id === undefined){

          var title = 'Home';
          var html = template.HTML(title);

          response.writeHead(200);
          response.end(html);

      }



  });

app.listen(port,host,function(){
  console.log(`server running at http://${host}:${port}/`);
});
