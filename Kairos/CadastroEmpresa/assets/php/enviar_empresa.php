<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$duplicado=false;
$local='../../cadastro_empresa';

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

$select=mysqli_query($conec, "SELECT cnpj FROM empresa WHERE cnpj = '$cnpj'")->fetch_assoc();


if(isset($select['cnpj'])){
    $local=$local.'?'.md5('cnpj=false');
    $duplicado=true;
}
if($duplicado){
    header("Refresh:0; url="."$local");
    exit;
} else {
    $result = mysqli_multi_query($conec,"INSERT INTO empresa(cpf_usuario,nome,nome_fantasia,cnpj,ramo) VALUES((SELECT cpf FROM usuario WHERE cpf = '$cpf'),'$nome_empresa','$nome_fantasia','$cnpj','$ramo');
                                        INSERT INTO endereco_empresa(cnpj_empresa,cep,rua,numero,bairro,cidade,estado) VALUES((SELECT cnpj FROM empresa WHERE cnpj = '$cnpj'),'$cep_empresa','$rua_empresa','$numero_empresa','$bairro_empresa','$cidade_empresa','$estado_empresa')" );

    if(isset($_COOKIE['cadastro_empresa'])){
        header('Location: ../../../Perfil/PerfilEmpresa/empresa?'.md5('sucesso=true'));
        exit;
    } else {
        header('Location: ../../../Login/login?'.md5('sucesso=true'));
        exit;
    }
    
}


?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>