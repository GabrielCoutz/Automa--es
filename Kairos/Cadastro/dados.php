<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$nome=$_POST['nome'];
$_SESSION['cpf'] = $_POST['cpf'];
$tel=$_POST['tel'];
$email=$_POST['email'];
$cpf=$_POST['cpf'];
$cep=$_POST['cep'];
$rua=$_POST['rua'];
$numero=$_POST['numero'];
$bairro=$_POST['bairro'];
$cidade=$_POST['cidade'];
$estado=$_POST['estado'];
$senha=md5($_POST['senha']);

$duplicado=false;
$local='cadastro.php';

$select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE cpf = '$cpf'");

$select_email=mysqli_query($conec, "SELECT email FROM usuario WHERE email = '$email'");

$result=$select->fetch_assoc();
$result_email=$select_email->fetch_assoc();

if(isset($result_email['email'])){
    $local=$local.'?'.md5('email=false');
    $duplicado=true;
}
if (isset($result['cpf'])){
    $local=$local.'?'.md5('cpf=false');
    $duplicado=true;
}

if($duplicado){
    header("Refresh:0; url="."$local");
    exit;
} else {
    $result=mysqli_multi_query($conec,"INSERT INTO usuario(nome,telefone,email,cpf,cep,senha) VALUES('$nome','$tel','$email','$cpf','$cep','$senha'); INSERT INTO endereco(id_usuario,cep,rua,numero,bairro,cidade,estado) VALUES((SELECT id FROM usuario WHERE cpf = '$cpf'),'$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')");
    header('Location: CadastroEmpresa/cadastro_empresa.php');
    exit;
}

?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

