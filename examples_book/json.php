<?php
$myObj->name = "Somchai";
$myObj->age = 30;
$myObj->city = "Bangkok";

$myJSON = json_encode($myObj);

echo $myJSON;
?>