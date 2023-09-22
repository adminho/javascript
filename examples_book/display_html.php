<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $html = $_POST['code'];
    if (!empty($html)) {        
        echo $html;
		exit();
    } else {
		echo "not found html";
		exit();
	}
}
?>