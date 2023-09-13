<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $html = $_POST['html'];
    if (!empty($html)) {        
        echo $html;
    } else {
		echo "not found html";
	}
}
?>