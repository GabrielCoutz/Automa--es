<?php

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$email='gabriel.coutinho.cassiano@gmail.com';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$select=mysqli_query($conec, "SELECT * FROM usuario WHERE email = '$email'");
$result=$select->fetch_assoc();
foreach ($result as $item) {
    echo $item.'<br>';
}
echo '------------------------<br>';
$id=$result['id'];
$cpf=$result['cpf'];

$select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE id_usuario = '$id'");
$result_endereco=$select_endereco->fetch_assoc();
foreach ($result_endereco as $item) {
    echo $item.'<br>';
}
echo '------------------------<br>';

$select_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE id_usuario = '$id'");
$result_empresa=$select_empresa->fetch_assoc();
foreach ($result_empresa as $item) {
    echo $item.'<br>';
}
echo '------------------------<br>';
$id_empresa=$result_empresa['id'];


$select_empresa_endereco=mysqli_query($conec, "SELECT * FROM endereco_empresa WHERE id_empresa = '$id_empresa'");
$result_empresa_endereco=$select_empresa_endereco->fetch_assoc();
foreach ($result_empresa_endereco as $item) {
    echo $item.'<br>';
}
echo '------------------------<br>';

$select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE cpf_usuario = '$cpf'");
$result_cartao=$select_cartao->fetch_assoc();
foreach ($result_cartao as $item) {
    echo $item.'<br>';
}
echo '------------------------<br>';


?>