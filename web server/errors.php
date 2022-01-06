<?php

$server = "localhost";
$db = "id14808951_eduwrite";
$password = "Il4WO)(08NsZYxY_";
$user = "id14808951_moises";
$id_user = $_POST['id'];
$letter = $_POST['letter'];
$type = $_POST['type'];


$connect = mysqli_connect($server,$user, $password,$db);


$sql = "SELECT * FROM `Errors` WHERE `letter` = '$letter' and `idUser` = '$id_user' and  `type` = '$type'";
$result = mysqli_query($connect,$sql);
$row_cnt = mysqli_num_rows($result);

if($row_cnt > 0){
    $row = mysqli_fetch_assoc($result);
    $sql2 = "UPDATE `Errors` SET `tries` = tries + 1 WHERE `type` = '$type' and `letter` = '$letter' and `idUser` = '$id_user'";
    $result2 = mysqli_query($connect,$sql2);
    echo '1';
}
else{
   $sql2 = "INSERT INTO `Errors` (tries,idUser,letter,status,type) VALUES (1,'$id_user','$letter',1,'$type')";
   $result2 = mysqli_query($connect,$sql2);
   echo '1';
}

mysqli_close($connect);


?>