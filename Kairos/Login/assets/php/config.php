<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$_SESSION['email']=$_POST['email'];

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

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