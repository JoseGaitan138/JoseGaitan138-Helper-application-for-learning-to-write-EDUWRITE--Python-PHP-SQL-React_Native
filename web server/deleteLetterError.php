<?php

$server = "localhost";
$db = "id14808951_eduwrite";
$password = "Il4WO)(08NsZYxY_";
$user = "id14808951_moises";
$id_letter = $_GET['id'];


$connect = mysqli_connect($server,$user, $password,$db);


$sql = "DELETE FROM `Errors` WHERE `id` = '$id_letter'";
$result = mysqli_query($connect,$sql);

if(mysqli_query($connect,$sql)){
    echo '1';
}
else{
   echo '0';
}

mysqli_close($connect);

?>