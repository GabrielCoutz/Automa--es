<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");


$assinatura = $_SESSION['assinatura'];
$num_cartao = $_POST['num_cartao'];
$titular = $_POST['nome_cartao'];
$cvv_cartao = $_POST['cvv_cartao'];
$cpf=$_SESSION['cpf'];
$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];

$result=mysqli_query($conec, $_SESSION['usr_data']);
$result=mysqli_query($conec, $_SESSION['edr_data']);
$result=mysqli_query($conec, $_SESSION['cell_data']);
$result=mysqli_query($conec, $_SESSION['cmpny_data']);
$result=mysqli_query($conec, $_SESSION['cmpny_edr_data']);

$result=mysqli_query($conec, "INSERT INTO cartao(cpf_usuario, titular, numero, validade, cvv, assinatura) VALUES((SELECT cpf FROM usuario WHERE cpf = '$cpf'), '$titular', '$num_cartao', '$validade', '$cvv_cartao','$assinatura')");

header("Location: ../../../Login/login.php");

?>