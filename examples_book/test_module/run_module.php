<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$code = $_POST['code'];
    if (empty($code)) {        
		echo "not found javascript code";
		exit();
	}
	
	$allLines = preg_split("/(\r\n|\n|\r)/", $code);
	$importCode = "";
	$remainCode = "";
	foreach ($allLines as $line) {
		$line = trim($line);		
		if( str_starts_with($line, '//')) {			
			continue;
		} else if( str_starts_with($line, 'import') ) {
			$importCode = $importCode."\n".$line;
			
		} else {			
			$remainCode = $remainCode."\n".$line;			
		}
	}
}
?>

<html>
<head>
	<link href="../readme_md.css?v=1.1513" rel="stylesheet">  	
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap" rel="stylesheet">
	<style>
		body {
			font-family: 'Noto Sans Thai', sans-serif;
			font-size: 16px;
		}
	</style>
</head>
<body>
<div style="text-align:center; margin:5% 20%">
    <label for="target">โค้ดที่ import มอดูล</label>	
	<textarea id="target" class="notrun" ><?php echo $code; ?></textarea>	
	<br><br><span>แสดงผลลัพธ์</span>
	<div id="result" class="display-result"></div>
</div>
	
<script src="../runcode.js?v=11231"></script>
<script>
 __resultAreaId__ = "#result";

 let textArea = document.getElementById("target"); 
 textArea.rows=textArea.innerHTML .split('\n').length; 
</script>

<script type="module">
 <?php echo $importCode; ?>  
 console.log("@html<font color='lightgreen'>ผลการรัน:</font>");
try {  
  <?php echo $remainCode; ?>  
} catch(e) {
	console.log("@html<font color='orange'>++++Error++++</font>");	
	console.log("@html<font color='orange'>Uncaught " + e + "</font>");
	if(e.stack) {
		console.log("@html<font color='orange'>" + e.stack + "</font>");					
	} 
}
</script>

</body>
</html>