<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$local='../../empresa.php';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if(isset($_COOKIE['ramo'])){ // alteração de ramo
    $ramo=$_COOKIE['ramo'];
    $ramo_padrao=$_SESSION['ramo_padrao'];

    $result_ramo=mysqli_query($conec,"UPDATE empresa SET ramo='$ramo' WHERE ramo='$ramo_padrao'");

    setcookie('ramo', '', time() - 3600, '/');
    header('Location:'.$local.'?'.md5('livre=true'));
    exit;
}


?>