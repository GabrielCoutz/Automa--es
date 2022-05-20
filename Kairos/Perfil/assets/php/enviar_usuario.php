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

$local='../../usuario';
$duplicado=false;
$email_padrao=$_SESSION['email_padrao'];
$nome_padrao=$_SESSION['nome_padrao'];


if(isset($_GET['assinar'])){
    $_SESSION['cadastro']=md5('valido');
    $_SESSION['assinar']=md5('valido');
    header('Location: ../../../Assinaturas/assinatura?'.md5('cadastro=true'));
    exit;
}

if(isset($_COOKIE['excluir_num'])){ // deletar numeros de telefone
    $limite = $_COOKIE['excluir_nums'];
    $limite2 = $_COOKIE['excluir_nums'];

    $i = 1;
    while($limite > 0){
        $exc = $_COOKIE['del_num'.$i];
        $deletar = mysqli_query($conec, "DELETE FROM telefone WHERE tel='$exc'");
        $i ++;
        $limite --;
    }
    $i = 1;
    while($limite2 > 0){
        setcookie('del_num'.$i, '', time() - 3600, '/');
        $i ++;
        $limite2 --;
    }
    setcookie('excluir_num', '', time() - 3600, '/');
    setcookie('excluir_nums', '', time() - 3600, '/');
}

if(isset($_COOKIE['endereco'])){ // alteração do endereco

    $cep = $_POST['cep'];
    $numero = $_POST['numero'];
    $rua = $_POST['rua'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];

    $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE email_usuario='$email_padrao'")->fetch_assoc();

    if(empty($select_endereco['email_usuario'])){ // se não tiver endereço, então todos os dados são cadastrados
        $result_endereco=mysqli_query($conec, "INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES('$email_padrao', '$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')");

    } else { // senão é realizado apenas a alteração
        $result_endereco=mysqli_multi_query($conec,"UPDATE endereco SET cep='$cep' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET rua='$rua' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET numero='$numero' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET bairro='$bairro' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET cidade='$cidade' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET estado='$estado' WHERE email_usuario='$email_padrao';");
    }

    setcookie('endereco', '', time() - 3600, '/');
} ## arrumar o plano sendo excluido quando cpf é duplicado

if(isset($_COOKIE['senha'])){ // alterar senha
    //echo 'alterar senha';
    $senha_antiga = md5($_POST['senha_antiga']);
    $senha_nova = md5($_POST['senha_nova']);
    $senha_nova_dup = md5($_POST['senha_nova_dup']);

    $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE email ='$email_padrao'")->fetch_assoc()['senha'];
    if($select_senha != $senha_antiga){ 
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.md5('senha=false'));
        exit;

    } else {
        $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE email = '$email_padrao'");
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.md5('sucesso=true'));
        exit;
    }
}

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    $nome = $_POST['nome'];
    $tels= $_COOKIE['tels'];
    $num = 0;


    if(!empty($nome)){
        $result=mysqli_query($conec,"UPDATE usuario SET nome='$nome' WHERE email = '$email_padrao'");
    }

    if ($tels != 0){
        for($i= 0 ; $i < $tels ; $i++){
            $tel_add = $_COOKIE['phone'.$num.'number'];
            
            $result=mysqli_query($conec,"INSERT INTO telefone(email_usuario,tel) VALUES('$email_padrao','$tel_add')");
            $num+=1;
        }
    }
    $num = 0;
    if ($tels != 0){
        for($i= 0 ; $i < $tels ; $i++){
            setcookie('phone'.$num.'number', '', time() - 3600, '/');
            $num+=1;
        }
    }
    if (isset($_COOKIE['tels'])){
        setcookie('tels', '', time() - 3600, '/');
    }
    setcookie('usuario', '', time() - 3600, '/');
    header('Location:'.$local.'?'.md5('sucesso=true'));
    exit;
}



?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>