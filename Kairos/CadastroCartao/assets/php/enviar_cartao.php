<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
    $dbHost = 'sql210.epizy.com';
    $dbUname = 'epiz_30663895';
    $dbPass = 'ndLdcOqYk0K';
    $dbName = 'epiz_30663895_Banco_Kairos';
    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}


$assinatura = $_SESSION['assinatura'];
$num_cartao = $_POST['num_cartao'];
$titular = $_POST['nome_cartao'];
$cvv_cartao = $_POST['cvv_cartao'];
$cpf=$_SESSION['cpf'];
$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];

$result=mysqli_query($conec, "INSERT INTO cartao(cpf_usuario, titular, numero, validade, cvv, assinatura) VALUES((SELECT cpf FROM usuario WHERE cpf = '$cpf'), '$titular', '$num_cartao', '$validade', '$cvv_cartao','$assinatura')");
if(isset($_SESSION['assinar'])){
    header('Location: ../../../Perfil/usuario?'.md5('sucesso=true'));
    exit;
} else {
    header("Location: ../../../Login/login?".md5('sucesso=true'));
    exit;
}

?>