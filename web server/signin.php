<?php

$server = "localhost";
$db = "id14808951_eduwrite";
$password = "Il4WO)(08NsZYxY_";
$user = "id14808951_moises";
$email = $_POST['email'];
$pass = $_POST['password'];

$connect = mysqli_connect($server,$user, $password,$db);

$sql = "SELECT * FROM `User` WHERE `email` = '$email'";
$result = mysqli_query($connect,$sql);
$row_cnt = mysqli_num_rows($result);

if($row_cnt > 0){
    $row = mysqli_fetch_assoc($result);
    $passDB = $row['password'];
    $id_user = $row['id'];
    if (password_verify($pass, $passDB)) {
        echo '1'.",".$id_user;
    } else {
        echo '0','La contraseña no es válida.';
    }
}
else{
    echo '0','Usuario no encontrado';
}

mysqli_close($connect);


?>