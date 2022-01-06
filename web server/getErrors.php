<?php
$server = "localhost";
$db = "id14808951_eduwrite";
$password = "Il4WO)(08NsZYxY_";
$user = "id14808951_moises";
$id_user = $_POST['id'];

$connect = mysqli_connect($server,$user, $password,$db);
$sql = "SELECT * FROM `Errors` WHERE `idUser` = '$id_user' ORDER BY `tries` DESC LIMIT 3";
$resultado=mysqli_query($connect ,$sql);
$datos = array();
if(mysqli_num_rows($resultado)>0){
    while($row = mysqli_fetch_assoc($resultado)){
        //echo "Cita: ".$row['Mes']. " ". $row['Dia']." ".$row['Hora']."<br>";
        $datos[] = $row;
    }
    echo json_encode($datos);
}else{
    echo "0";
}
mysqli_close($connect);
?>