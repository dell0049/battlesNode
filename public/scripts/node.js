var http = require('http');
var fs = require("fs");
 
http.createServer(function(request, response) {
        fs.readFile("./battleship.html", function(err, data){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(data);
  response.end();
});
}).listen(3000);


//var fs = require('fs');
//var data = require('./battleship.html');
// console.log(data);
//
//
//fs.run('./battleship.html', 'utf-8', function(err, data){
//    console.log(data);
//});



//var fs = require('fs');
//
//var http = require('http');
//
//http.createServer(function(req, res){
//    fs.readFile('./battleship.html',function (err, data){
//        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
//        res.write(data);
//        res.end();
//    });
//}).listen(8000);