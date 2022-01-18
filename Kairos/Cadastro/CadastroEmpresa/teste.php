<?php
session_start();

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

echo $estado_empresa;

if (isset($cpf) and isset($nome_empresa) and isset($nome_fantasia) and isset($cnpj) and isset($ramo) and isset($cep_empresa) and isset($rua_empresa) and isset($numero_empresa) and isset($bairro_empresa) and isset($cidade_empresa) and isset($estado_empresa)){
    echo 'tudo certo';
}


?>