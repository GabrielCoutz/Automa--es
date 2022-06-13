<?php
session_start();


function conec(){
    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';

    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
        $dbHost = 'sql309.epizy.com';
        $dbUname = 'epiz_31926454';
        $dbPass = 'VOjqZcbwH38iVo';
        $dbName = 'epiz_31926454_Banco_Kairos';
    }

    return $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}

$local='../../usuario';
$duplicado=false;
$email_padrao=$_SESSION['email_padrao'];

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

if(isset($_GET['assinar'])){
    header('Location: ../../../Assinaturas/assinatura');
    exit;
}

if(isset($_COOKIE['excluir_num'])){ // deletar numeros de telefone
    $limite = $_COOKIE['excluir_nums'];
    $limite2 = $_COOKIE['excluir_nums'];

    $i = 1;
    while($limite > 0){
        $exc = $_COOKIE['del_num'.$i];
        $conec = conec();
        $deletar = mysqli_query($conec, "DELETE FROM telefone WHERE tel='$exc'") or die(mysqli_error($conec)."deletar");
        mysqli_close($conec);
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
    $conec = conec();
    $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE email_usuario='$email_padrao'")->fetch_assoc();
    mysqli_close($conec);

    if(empty($select_endereco['email_usuario'])){ // se não tiver endereço, então todos os dados são cadastrados
        $conec = conec();
        $result_endereco=mysqli_query($conec, "INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES('$email_padrao', '$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')") or die(mysqli_error($conec)."endereco1");
        mysqli_close($conec);

    } else { // senão é realizado apenas a alteração
        $conec = conec();
        $result_endereco=mysqli_multi_query($conec,"UPDATE endereco SET cep='$cep' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET rua='$rua' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET numero='$numero' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET bairro='$bairro' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET cidade='$cidade' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET estado='$estado' WHERE email_usuario='$email_padrao';") or die(mysqli_error($conec)."endereco2");
        mysqli_close($conec);
    }
    
    setcookie('endereco', '', time() - 3600, '/');
    verificarOperacao($result_endereco, $local); // verifica se a operação foi feita com sucesso
}

if(isset($_COOKIE['senha'])){ // alterar senha
    //echo 'alterar senha';
    $senha_antiga = md5($_POST['senha_antiga']);
    $senha_nova = md5($_POST['senha_nova']);
    $senha_nova_dup = md5($_POST['senha_nova_dup']);
    $conec = conec();
    $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE email ='$email_padrao'")->fetch_assoc()['senha'];
    mysqli_close($conec);
    if($select_senha != $senha_antiga){ 
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.md5('senha=false'));
        exit;

    } else {
        $conec = conec();
        $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE email = '$email_padrao'") or die(mysqli_error($conec)."senha");
        mysqli_close($conec);

        setcookie('senha', '', time() - 3600, '/');
        verificarOperacao($result_senha, $local); // verifica se a operação foi feita com sucesso
        

        header('Location:'.$local.'?'.md5('sucesso=true'));
        exit;
        }
}

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    $nome = $_POST['nome'];

    if(isset($_SESSION['nome_padrao'])  && $nome != $_SESSION['nome_padrao']){
        $conec = conec();
        $result=mysqli_query($conec,"UPDATE usuario SET nome='$nome' WHERE email = '$email_padrao'") or die(mysqli_error($conec)."nome");
        mysqli_close($conec);
        verificarOperacao($result, $local); // verifica se a operação foi feita com sucesso
    }
    if (isset($_COOKIE['tels'])){
        $tels = $_COOKIE['tels'];
        $num = 0;

        for($i= 0 ; $i < $tels ; $i++){
            $tel_add = $_COOKIE['phone'.$num.'number'];
            $conec = conec();
            $result=mysqli_query($conec,"INSERT INTO telefone(email_usuario,tel) VALUES('$email_padrao','$tel_add')") or die(mysqli_error($conec)."tel");
            mysqli_close($conec);
            verificarOperacao($result, 'loca2l'); // verifica se a operação foi feita com sucesso
            $result='';
            
            $num+=1;
        }
    
        $num = 0;
        for($i= 0 ; $i < $tels ; $i++){
            setcookie('phone'.$num.'number', '', time() - 3600, '/');
            $num+=1;
        }

        setcookie('tels', '', time() - 3600, '/');
    }

    setcookie('usuario', '', time() - 3600, '/');
    header('Location:'.$local.'?'.md5('sucesso=true'));
    exit;
}
?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>