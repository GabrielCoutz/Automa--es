<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$local='../../usuario';
$duplicado=false;
$email_padrao=$_SESSION['email_padrao'];
$tel_padrao=$_SESSION['tel_padrao'];
$nome_padrao=$_SESSION['nome_padrao'];

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

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
    $cpf=$_SESSION['cpf'];
    

    $result_nome_empresa=mysqli_multi_query($conec,"UPDATE endereco SET cep='$cep' WHERE cpf_usuario='$cpf';
    UPDATE endereco SET rua='$rua' WHERE cpf_usuario='$cpf';
    UPDATE endereco SET numero='$numero' WHERE cpf_usuario='$cpf';
    UPDATE endereco SET bairro='$bairro' WHERE cpf_usuario='$cpf';
    UPDATE endereco SET cidade='$cidade' WHERE cpf_usuario='$cpf';
    UPDATE endereco SET estado='$estado' WHERE cpf_usuario='$cpf';");

    setcookie('endereco', '', time() - 3600, '/');

}

if(isset($_COOKIE['senha'])){ // alterar senha
    //echo 'alterar senha';
    $senha_antiga = md5($_POST['senha_antiga']);
    $senha_nova = md5($_POST['senha_nova']);
    $senha_nova_dup = md5($_POST['senha_nova_dup']);
    $cpf=$_SESSION['cpf'];

    $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE cpf ='$cpf'")->fetch_assoc()['senha'];
    if($select_senha != $senha_antiga){
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.md5('senha=false'));
        exit;
    } else {
        $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE cpf = '$cpf'");
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.md5('sucesso=true'));
        exit;
    }

}

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    //echo 'alterar usuario';
    $email=$_POST['email'];
    $nome = $_POST['nome'];
    $cpf=$_SESSION['cpf'];
    $tels= $_COOKIE['tels'];
    $num = 2;

    if($nome != ''){
        $result=mysqli_query($conec,"UPDATE usuario SET nome='$nome' WHERE nome='$nome_padrao'");
    }
    
    if(isset($email) && $email != ''){
        $select_email=mysqli_query($conec, "SELECT email FROM usuario WHERE email ='$email'");
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

        if ($tels != 0){
            for($i= 0 ; $i < $tels ; $i++){
                $tel_add = $_COOKIE['phone'.$num.'number'];
                $aaa = "INSERT INTO telefone(cpf_usuario,tel) VALUES('$cpf', '$tel_add')";
                
                $result=mysqli_query($conec,"INSERT INTO telefone(cpf_usuario,tel) VALUES('$cpf','$tel_add')");
                $num+=1;
            }
        }
        $num = 2;
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
}

?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>