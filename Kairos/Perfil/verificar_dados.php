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


if(!isset($_COOKIE['empresa'])){ // alteração de dados usuário
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

    if($_POST['nome_empresa_input'] != ''){
        $nome_empresa = $_POST['nome_empresa_input'];
        $select_nome_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE nome ='$nome_empresa'");
    }
    if($_POST['nome_fantasia_input'] != ''){
        $nome_fantasia = $_POST['nome_fantasia_input'];
        $select_nome_fantasia=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_fantasia ='$nome_fantasia'");
    }

    if(isset($nome_empresa) && $select_nome_empresa->fetch_assoc()['nome'] == $nome_empresa){
        $local=$local.'?'.md5(('nome_empresa_duplicado=true'));
        $duplicado=true;
    }

    if(isset($nome_fantasia) && $select_nome_fantasia->fetch_assoc()['nome_fantasia'] == $nome_fantasia){
        $local=$local.'?'.md5(('nome_fantasia_duplicado=true'));
        $duplicado=true;
    }

    if(isset($_COOKIE['endereco_empresa'])){ // alteração do endereco da empresa
        $cep_empresa = $_COOKIE['cep_empresa'];
        $numero_empresa = $_COOKIE['numero_empresa'];
        $rua_empresa = $_COOKIE['rua_empresa'];
        $bairro_empresa = $_COOKIE['bairro_empresa'];
        $cidade_empresa = $_COOKIE['cidade_empresa'];
        $estado_empresa = $_COOKIE['estado_empresa'];
    
        echo $cep_empresa.'<br>';
        echo $numero_empresa.'<br>';
        echo $rua_empresa.'<br>';
        echo $bairro_empresa.'<br>';
        echo $cidade_empresa.'<br>';
        echo $estado_empresa.'<br>';
    } else {
        echo 'nd';
    }

    if($duplicado){
        header('Location: '.$local);
        exit;

        //echo ($local);
        //echo '<br>Duplicado';

    } else {

        if(isset($nome_empresa)){
            $result_nome_empresa=mysqli_query($conec,"UPDATE empresa SET nome='$nome_empresa' WHERE nome='$nome_empresa_padrao'");
        }
        if(isset($nome_fantasia)){
            $result_nome_fantasia=mysqli_query($conec,"UPDATE empresa SET nome_fantasia='$nome_fantasia' WHERE nome_fantasia='$nome_fantasia_padrao'");
        }
        //header('Location:'.$local.'?'.md5('livre=true'));
        //exit;

        //echo($local);
        //echo '<br>Não duplicado';
    }
}
?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>