import * as http from "http";
import * as fs from "fs";
import * as url from "url";
/* ถ้านำเข้ามอดูลตามมาตรฐาน CommonJS ก็ให้ใช้ require()
var http = require("http"),
      fs = require("fs"),
      url = require("url"); */
http.createServer( function(request, response) {
      var parser = url.parse(request.url,true);
      var path = parser.pathname;
      var query = parser.query;	
      if( path=="/message" ) {		
             var echo = `{"echo" : "${query.msg}"}`;           		
        	   //response.writeHead(200, {"Content-Type": "text/plain"});    		
	   response.writeHead(200, { 
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin" : "*"});
	   response.end(echo);		 
      	   console.log(echo);
      }
}).listen(8001,"127.0.0.1");
console.log("Server running at http://127.0.0.1:8001/");