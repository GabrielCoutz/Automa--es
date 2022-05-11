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

$_SESSION['email']=$_POST['email'];


if (isset($_GET['validar'])){

    $email=$_POST['email'];
    $senha=md5($_POST['senha']);
    
    $select=mysqli_query($conec, "SELECT email, senha FROM usuario WHERE email ='$email'");
    
    $result=$select->fetch_assoc();
    
    if(mysqli_num_rows($select)){
        
        if($result['email'] == $email && $result['senha'] == $senha){
            header('Location: ../../login?'.md5('login=true'));
            exit;
        } else {
            header('Location: ../../login?'.md5('login=false'));
            exit;
            
        }
    }else{
        header('Location: ../../login?'.md5('login=false'));
        exit;
        
    }
}
?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>