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
$cvv_cartao = md5($_POST['cvv_cartao']);
$cpf=$_SESSION['cpf'];
$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];
$email = $_SESSION['email'];
$cpf=$_POST['cpf'];
$cep=$_POST['cep'];
$rua=$_POST['rua'];
$numero=$_POST['numero'];
$bairro=$_POST['bairro'];
$cidade=$_POST['cidade'];
$estado=$_POST['estado'];

$local='../../cadastro_cartao';

$select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE cpf = '$cpf'")->fetch_assoc();

if (isset($select['cpf'])){
    $local=$local.'?'.md5('cpf=false');
    header("Refresh:0; url="."$local");
    exit;
}

$result=mysqli_query($conec, "INSERT INTO cartao(email_usuario, titular, numero, validade, cvv, assinatura) VALUES((SELECT email FROM usuario WHERE email = '$email'), '$titular', '$num_cartao', '$validade', '$cvv_cartao','$assinatura')");

$result_usuario=mysqli_query($conec, "UPDATE usuario SET cpf='$cpf' WHERE email='$email'");

$result_endereco=mysqli_query($conec, "INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES('$email', '$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')");

if(isset($_SESSION['assinar'])){
    header('Location: ../../../Perfil/usuario?'.md5('sucesso=true'));
    exit;
} else {
    header("Location: ../../../Login/login?".md5('sucesso=true'));
    exit;
}

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>