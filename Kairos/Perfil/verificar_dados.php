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
$ramo_padrao=$_SESSION['ramo_padrao'];


$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$tel=$_POST['tel_input'];
$tels= $_COOKIE['tels'];
$num = 2;

for($i= 0 ; $i < $tels ; $i++){
    $tel_add = $_COOKIE['phone%5B'.$num.'%5D%5Bnumber%5D'];
    echo $tel_add;
    $num+=1;
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
    header('Location:'.$local.'?'.md5('livre=true'));
    exit;
    
}

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    //echo 'alterar usuario';
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
        $num = 2;
        if ($tels != 0){
            for($i= 0 ; $i < $tels ; $i++){
                setcookie('phone%5B'.$num.'%5D%5Bnumber%5D', '', time() - 3600, '/');
                $num+=1;
            }
        }
        if (isset($_COOKIE['tels'])){
            setcookie('tels', '', time() - 3600, '/');
        }
        header('Location:'.$local.'?'.md5('livre=true'));
        exit;
    }
}

if(isset($_COOKIE['endereco_empresa'])){ // alteração do endereco da empresa
    //echo 'alterar endereco empresa';
    $cep_empresa = $_COOKIE['cep_empresa'];
    $numero_empresa = $_COOKIE['numero_empresa'];
    $rua_empresa = $_COOKIE['rua_empresa'];
    $bairro_empresa = $_COOKIE['bairro_empresa'];
    $cidade_empresa = $_COOKIE['cidade_empresa'];
    $estado_empresa = $_COOKIE['estado_empresa'];
    $cnpj_padrao=$_SESSION['cnpj_padrao'];

    $result_nome_empresa=mysqli_multi_query($conec,"UPDATE endereco_empresa SET cep='$cep_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET rua='$rua_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET numero='$numero_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET bairro='$bairro_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET cidade='$cidade_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET estado='$estado_empresa' WHERE cnpj_empresa='$cnpj_padrao';");

    setcookie('cep_empresa', '', time() - 3600, '/');
    setcookie('numero_empresa', '', time() - 3600, '/');
    setcookie('rua_empresa', '', time() - 3600, '/');
    setcookie('bairro_empresa', '', time() - 3600, '/');
    setcookie('cidade_empresa', '', time() - 3600, '/');
    setcookie('estado_empresa', '', time() - 3600, '/');

    header('Location:'.$local.'?'.md5('livre=true'));
    exit;
}

if(isset($_COOKIE['ramo'])){ // alteração de ramo
    $ramo=$_COOKIE['ramo'];

    $result_ramo=mysqli_query($conec,"UPDATE empresa SET ramo='$ramo' WHERE ramo='$ramo_padrao'");

    setcookie('ramo', '', time() - 3600, '/');
}

if(isset($_COOKIE['empresa'])) { // alteração de dados empresa
    //echo 'alterar empresa';

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

        header('Location:'.$local.'?'.md5('livre=true'));
        exit;

        //echo($local);
        //echo '<br>Não duplicado';
    }
}

if(isset($_COOKIE['senha'])){ // alterar senha
    //echo 'alterar senha';
    $senha_antiga = md5($_POST['senha_antiga_input']);
    $senha_nova = md5($_POST['senha_nova_input']);
    $senha_nova_dup = md5($_POST['senha_nova_dup_input']);
    $cpf=$_SESSION['cpf'];

    $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE cpf ='$cpf'")->fetch_assoc()['senha'];
    if($select_senha != $senha_antiga){
        header('Location:'.$local.'?'.md5('senha=false'));
        exit;
    } else {
        $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE cpf = '$cpf'");
        header('Location:'.$local.'?'.md5('livre=true'));
        exit;
    }


}

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>