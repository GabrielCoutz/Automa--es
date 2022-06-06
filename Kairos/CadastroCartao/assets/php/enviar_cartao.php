<?php
session_start();
error_reporting(E_ERROR | E_PARSE);

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

if(isset($_GET['alterar_plano'])){ // alteração de plano contratado
    $assinatura = $_GET['assinatura'];
    $email = $_SESSION['email'];
    $result_alterar=mysqli_query($conec, "UPDATE cartao SET assinatura='$assinatura' WHERE email_usuario='$email'") or die(mysqli_error($conec)."alteração");
    header('Location: ../../../Perfil/usuario?'.md5('sucesso=true'));
    exit;
}

$num_cartao = $_POST['num_cartao'];
$titular = $_POST['nome_cartao'];
$cvv_cartao = md5($_POST['cvv_cartao']);
$cpf=$_POST['cpf'];
$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];
$email = $_SESSION['email'];
$cpf=$_POST['cpf'];
$cep=$_POST['cep'];
$rua=$_POST['rua'];
$numero=$_POST['numero'];
$bairro=$_POST['bairro'];
$cidade=$_POST['cidade'];
$estado=$_POST['estado'];

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

$local='../../cadastro_cartao';

$select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE cpf = '$cpf'")->fetch_assoc();

if (isset($select['cpf'])){
    $local=$local.'?'.md5('cpf=false').'?plano='.$assinatura;
    header("Refresh:0; url="."$local");
    exit;
} else {
    $assinatura=$_SESSION['assinatura'];
    $result=mysqli_query($conec, "INSERT INTO cartao(email_usuario, titular, numero, validade, cvv, assinatura) VALUES((SELECT email FROM usuario WHERE email = '$email'), '$titular', '$num_cartao', '$validade', '$cvv_cartao','$assinatura')") or die(mysqli_error($conec)."result");
    verificarOperacao($result, $local);

    $result_usuario=mysqli_query($conec, "UPDATE usuario SET cpf='$cpf' WHERE email='$email'") or die(mysqli_error($conec)."usuario");
    verificarOperacao($result_usuario, $local);

    $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE email_usuario='$email'")->fetch_assoc();
}

if (empty($select_endereco['email_usuario'])) { // se não tiver endereço, então todos os dados são cadastrados
    $result_endereco=mysqli_query($conec, "INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES('$email', '$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')") or die(mysqli_error($conec)."endereco2");

} else { // senão é realizado apenas a alteração
    $result_endereco=mysqli_multi_query($conec,"UPDATE endereco SET cep='$cep' WHERE email_usuario='$email';
    UPDATE endereco SET rua='$rua' WHERE email_usuario='$email';
    UPDATE endereco SET numero='$numero' WHERE email_usuario='$email';
    UPDATE endereco SET bairro='$bairro' WHERE email_usuario='$email';
    UPDATE endereco SET cidade='$cidade' WHERE email_usuario='$email';
    UPDATE endereco SET estado='$estado' WHERE email_usuario='$email';") or die(mysqli_error($conec)."endereco");
}
verificarOperacao($result_endereco, $local);


if(isset($_SESSION['cadastro'])){
    header('Location: ../../../Perfil/usuario?'.md5('sucesso=true'));
    exit;
} else {
    header("Location: ../../../Login/login?".md5('sucesso=true'));
    exit;
}

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>