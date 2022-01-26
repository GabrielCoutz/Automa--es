<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';


$local='perfil.php';
$duplicado=false;

$email_padrao=$_SESSION['email_padrao'];
$tel_padrao=$_SESSION['tel_padrao'];
$nome_empresa_padrao=$_SESSION['nome_empresa_padrao'];
$nome_fantasia_padrao=$_SESSION['nome_fantasia_padrao'];


$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");


if(!isset($_COOKIE['cnpj'])){ // alteração de dados usuário
    echo 'alterar usuario';

    $email=$_POST['email_input'];
    $tel=$_POST['tel_input'];
    $cpf=$_SESSION['cpf'];
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
                $tel_add = $_COOKIE['phone%5B'.$num.'%5D%5Bnumber%5D'];
                $result=mysqli_query($conec,"INSERT INTO telefone(cpf_usuario,tel) VALUES('$cpf','$tel_add')");
                $num+=1;
            }
        }
        header('Location:'.$local.'?'.md5('livre=true'));
        exit;
    }
} else { // alteração de dados empresa
    echo 'alterar empresa<br>';
    echo $_COOKIE['nome_fantasia'];

    if($_COOKIE['cnpj'] != ''){
        $cnpj=$_COOKIE['cnpj'];
        $select_cnpj=mysqli_query($conec, "SELECT * FROM empresa WHERE cnpj ='$cnpj'");
        
    }
    if($_COOKIE['nome_empresa'] != ''){
        $nome_empresa=$_COOKIE['nome_empresa'];
        $select_nome_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_empresa ='$nome_empresa'");
        
    }
    if($_COOKIE['nome_fantasia'] != ''){
        $nome_fantasia=$_COOKIE['nome_fantasia'];
        echo $nome_fantasia;
        $select_nome_fantasia=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_fantasia ='$nome_fantasia'");
    }

    if(isset($select_cnpj)){
        $local=$local.'?'.('cnpj_duplicado=true');
        $duplicado=true;
    }
    
    if($select_nome_empresa == $nome_empresa){
        $local=$local.'?'.('nome_empresa_duplicado=true');
        $duplicado=true;
    }
    if($select_nome_fantasia == $nome_fantasia){
        $local=$local.'?'.('nome_fantasia_duplicado=true');
        $duplicado=true;
    }


    if($duplicado){
        //header('Location: '.$local);
        echo ($local);
        echo '<br>Duplicado';
        //exit;
    } else {
        if(isset($cnpj)){
            $result_cnpj=mysqli_query($conec,"UPDATE empresa SET cnpj='$cnpj' WHERE cnpj='$cnpj'");
        }
        if(isset($nome_empresa)){
            echo $nome_empresa;
            $result_nome_empresa=mysqli_query($conec,"UPDATE empresa SET nome_empresa='$nome_empresa' WHERE nome_empresa='$nome_empresa_padrao'");
        }
        if(isset($nome_fantasia)){
            $result_nome_fantasia=mysqli_query($conec,"UPDATE empresa SET nome_fantasia='$nome_fantasia' WHERE nome_fantasia='$nome_fantasia_padrao'");
        }
        //header('Location:'.$local.'?'.md5('livre=true'));
        //exit;

        echo($local);
        echo '<br>Não duplicado';
    }
}
?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>