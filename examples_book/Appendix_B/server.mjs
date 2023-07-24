import * as http from "http";
// ถ้านำเข้ามอดูลตามมาตรฐาน CommonJS ก็ให้ใช้ require()
// var http = require("http");
http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<html><body><h1>Hello, world!</h1></body></html>"); 
  res.end();
}).listen(8001, "127.0.0.1");
console.log("Server running at http://127.0.0.1:8001/");
