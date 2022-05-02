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

$email=$_POST['email'];
$cpf=$_POST['cpf'];
$nome=strtolower($_POST['nome']);


$select=mysqli_query($conec, "SELECT email, nome, senha, cpf FROM usuario WHERE cpf ='$cpf'")->fetch_assoc();

if($select){
    if(trim($email) == $select['email'] && trim($nome) == strtolower($select['nome']) && $cpf == $select['cpf']){ // dados corretos
        $_SESSION['cpf']=$select['cpf'];
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