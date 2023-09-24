<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

$chap= isset($_GET['chap']) ? $_GET['chap'] : '';

$url = "https://raw.githubusercontent.com/adminho/javascript/master/examples_book/";
echo file_get_contents($url.$chap);

?>