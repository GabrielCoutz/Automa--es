<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$email=$_POST['email_input'];
$cpf=$_POST['cpf_input'];
$tel=$_POST['tel_input'];

$local='perfil.php';
$duplicado=false;

$email_padrao=$_SESSION['email_padrao'];
$cpf_padrao=$_SESSION['cpf_padrao'];
$tel_padrao=$_SESSION['tel_padrao'];

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if(isset($email)){
    $select_email=mysqli_query($conec, "SELECT * FROM usuario WHERE email ='$email'");
    $result_email=$select_email->fetch_assoc();
}
if(isset($cpf)){
    $select_cpf=mysqli_query($conec, "SELECT * FROM usuario WHERE cpf ='$cpf'");
    $result_cpf=$select_cpf->fetch_assoc();
}


if(isset($result_email['email'])){
    $local=$local.'?'.md5('email_duplicado=true');
    $duplicado=true;
}

if(isset($result_cpf['cpf'])){
    $local=$local.'?'.md5('cpf_duplicado=true');
    $duplicado=true;
}

if($duplicado){
    header('Location: '.$local);
    exit;
} else {
    if($email != ''){
        $result=mysqli_query($conec,"UPDATE usuario SET email='$email' WHERE email='$email_padrao'");
        $_SESSION['email']=$email;
    }
    if($cpf != ''){
        $result=mysqli_query($conec,"UPDATE usuario SET cpf='$cpf' WHERE cpf='$cpf_padrao'");
    }
    if($tel != ''){
        $result=mysqli_query($conec,"UPDATE usuario SET telefone='$tel' WHERE telefone='$tel_padrao'");
    }
    // header('Location:'.$local.'?'.md5('livre=true'));
    exit;
}

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>