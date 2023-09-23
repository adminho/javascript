<html>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$code = $_POST['code'];
	
    if (empty($code)) {        
		echo "not found javascript code";
		exit();
	}
	$firstLines  =explode("\n", $code)[0];
	$firstLines = str_replace("//","",$firstLines);
	$firstLines = str_replace("-","",$firstLines);
	$firstLines = str_replace("ไฟล์","",$firstLines);
	$modulename = trim($firstLines);
	
	if( strpos($code, "<?php") != False || strpos($code, "?>") != False){
		echo "Sorry! It can't upload beacause this is a php file, it is dangerous";
		exit();
	}
		
	if( strpos($modulename, ".js") == False){
		echo "Sorry! It can't upload beacause this is a not *.js file";
		exit();
	}
	
    if(file_put_contents($modulename , $code)>0){
		echo "<h1>Import module: <font color='blue'>".$modulename."</font> -> success</h1>";
		exit();
	}else {
		echo "Empty file: ".$modulename;
	}
}
?>
</body>
</html>