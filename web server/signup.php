<?php

$server = "localhost";
$db = "id14808951_eduwrite";
$password = "Il4WO)(08NsZYxY_";
$user = "id14808951_moises";

$name = $_POST['name'];
$email = $_POST['email'];
$pass = $_POST['password'];

$connect = mysqli_connect($server,$user, $password,$db);

$sql = "SELECT * FROM `User` WHERE `email` = '$email'";
$result = mysqli_query($connect,$sql);
$row_cnt = mysqli_num_rows($result);

if($row_cnt > 0){
    echo 'Usuario ya ocupado';
} else {
    $passEncrypted = password_hash($pass, PASSWORD_DEFAULT);
    
    
    $sql = "INSERT INTO `User` (`name`, `email`, `password`) VALUES ('$name','$email','$passEncrypted');";
    
        if(mysqli_query($connect,$sql)){
            echo "1";
        }
        else{
            echo "Ocurrio un error intentelo mas tarde";
        }
}


mysqli_close($connect);

?> 