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

if(isset($_POST['g-recaptcha-response']) && $_POST['g-recaptcha-response'] != ""){
    $url='https://www.google.com/recaptcha/api/siteverify';
    $secret = '6Ld5L3oeAAAAAF7ExJjjJbY9EnWGQSyjCin5aGRL';
    $response = $_POST['g-recaptcha-response'];
    $variaveis = "secret=".$secret."&response=".$response;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $variaveis);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $resp = json_decode(curl_exec($ch));

    if ($resp->success != 1){
        header('Location: ../../recuperacao?'.md5('erro=true'));
        exit;
    }
}

$email=$_POST['email'];
$nome=strtolower($_POST['nome']);
$_SESSION['mudar'] = 'true';


$select=mysqli_query($conec, "SELECT email, nome, senha FROM usuario WHERE email ='$email'")->fetch_assoc();

if($select){
    if(trim($email) == $select['email'] && trim($nome) == strtolower($select['nome'])){ // dados corretos
        header('Location: ../../recuperacao?'.md5('sucesso=true'));
        exit;

    } else { // dados diferentes
        header('Location: ../../recuperacao?'.md5('sucesso=false'));
        exit;
    }

} else { // usuario não existe
    header('Location: ../../recuperacao?'.md5('sucesso=false'));
    exit;
}

?>