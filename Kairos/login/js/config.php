<?php
session_start();
$dbHost = 'sql210.epizy.com';
$dbUname = 'epiz_30663895';
$dbPass = 'ndLdcOqYk0K';
$dbName = 'epiz_30663895_Banco_Kairos';
$_SESSION['login']=false;
$_SESSION['email']=$_POST['email'];

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if (isset($_GET['validar'])){
    //echo'entrou';
    $email=$_POST['email'];
    $senha=md5($_POST['senha']);
    
    $select=mysqli_query($conec, "SELECT email, senha FROM usuario WHERE email ='$email'");
    
    $result=$select->fetch_assoc();
    
    if(mysqli_num_rows($select)){
        
        if($result['email'] == $email && $result['senha'] == $senha){
            header('Location: ../index.php?'.md5('login=true'));
            exit;
        } else {
            header('Location: ../index.php?'.md5('login=false'));
            exit;
            
        }
    }else{
        header('Location: ../index.php?'.md5('login=false'));
        exit;
        
    }
}
?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>