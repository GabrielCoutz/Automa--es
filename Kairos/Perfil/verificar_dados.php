<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$email=$_POST['email_input'];
$tel=$_POST['tel_input'];

$local='perfil.php';
$duplicado=false;

$email_padrao=$_SESSION['email_padrao'];
$tel_padrao=$_SESSION['tel_padrao'];
$cpf=$_SESSION['cpf'];


$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$tels= $_COOKIE['tels'];

$num = 2;


  if(isset($email)){
      $select_email=mysqli_query($conec, "SELECT * FROM usuario WHERE email ='$email'");
      $result_email=$select_email->fetch_assoc();
  }
  
  if(isset($result_email['email'])){
      $local=$local.'?'.md5('email_duplicado=true');
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
      if($tel != ''){
          $result=mysqli_query($conec,"UPDATE telefone SET tel='$tel' WHERE tel='$tel_padrao'");
      }
      if ($tels != 0){
         for($i= 0 ; $i < $tels ; $i++){
             $aa = $_COOKIE['phone%5B'.$num.'%5D%5Bnumber%5D'];
             $result=mysqli_query($conec,"INSERT INTO telefone(cpf_usuario,tel) VALUES('$cpf','$aa')");
             $num+=1;
         }
      }
      header('Location:'.$local.'?'.md5('livre=true'));
       exit;
 }

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>