<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$cpf=$_SESSION['cpf'];
$nome_empresa=$_POST['nome_empresa'];
$nome_fantasia=$_POST['nome_fantasia'];
$cnpj=$_POST['cnpj'];
$ramo=$_POST['ramo'];
$cep_empresa=$_POST['cep_empresa'];
$rua_empresa=$_POST['rua_empresa'];
$numero_empresa=$_POST['numero_empresa'];
$bairro_empresa=$_POST['bairro_empresa'];
$cidade_empresa=$_POST['cidade_empresa'];
$estado_empresa=$_POST['estado_empresa'];

$result=mysqli_multi_query($conec, "INSERT INTO empresa(id_usuario,nome,nome_fantasia,cnpj,ramo) VALUES((SELECT id FROM usuario WHERE cpf = '$cpf'),'$nome_empresa','$nome_fantasia','$cnpj','$ramo');
INSERT INTO endereco_empresa(id_empresa,cep,rua,numero,bairro,cidade,estado) VALUES((SELECT id FROM empresa WHERE cnpj = '$cnpj'),'$cep_empresa','$rua_empresa','$numero_empresa','$bairro_empresa','$cidade_empresa','$estado_empresa')");

header('Location: Assinaturas/assinatura.php');
?>