<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$local='../../empresa';
$duplicado = false;

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if(isset($_COOKIE['ramo'])){ // alteração de ramo
    $ramo=$_COOKIE['ramo'];
    $ramo_padrao=$_SESSION['ramo_padrao'];

    $result_ramo=mysqli_query($conec,"UPDATE empresa SET ramo='$ramo' WHERE ramo='$ramo_padrao'");
}

if(isset($_COOKIE['endereco_empresa'])){ // alteração do endereco da empresa

    $cep_empresa = $_POST['cep_empresa_input'];
    $numero_empresa = $_POST['numero_empresa_input'];
    $rua_empresa = $_POST['rua_empresa_input'];
    $bairro_empresa = $_POST['bairro_empresa_input'];
    $cidade_empresa = $_POST['cidade_empresa_input'];
    $estado_empresa = $_POST['estado_empresa_input'];
    $cnpj_padrao=$_SESSION['cnpj_padrao'];

    $result_nome_empresa=mysqli_multi_query($conec,"UPDATE endereco_empresa SET cep='$cep_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET rua='$rua_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET numero='$numero_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET bairro='$bairro_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET cidade='$cidade_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET estado='$estado_empresa' WHERE cnpj_empresa='$cnpj_padrao';");

    setcookie('endereco_empresa', '', time() - 3600, '/');
}

if(isset($_COOKIE['empresa'])) { // alteração de dados empresa
    if($_POST['nome_empresa_input'] != ''){ // verificação se o nome digitado já existe
        $nome_empresa = $_POST['nome_empresa_input'];
        $select_nome_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE nome ='$nome_empresa'")->fetch_assoc()['nome'];
    }
    if($_POST['nome_fantasia_input'] != ''){ // verificação se o nome digitado já existe
        $nome_fantasia = $_POST['nome_fantasia_input'];
        $select_nome_fantasia=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_fantasia ='$nome_fantasia'")->fetch_assoc()['nome_fantasia'];
    }

    if(isset($nome_empresa) && $select_nome_empresa == $nome_empresa){ //sinalização de duplicação
        $local=$local.'?'.md5(('nome_empresa_duplicado=true'));
        $duplicado=true;
    }

    if(isset($nome_fantasia) && $select_nome_fantasia == $nome_fantasia){ //sinalização de duplicação
        $local=$local.'?'.md5(('nome_fantasia_duplicado=true'));
        $duplicado=true;
    }

    if($duplicado){ //retorno da verificação
        setcookie('empresa', '', time() - 3600, '/');
        
        header('Location: '.$local);
        exit;

    } else { // se não, atualiza os nomes digitados

        $nome_fantasia_padrao=$_SESSION['nome_fantasia_padrao'];
        $nome_empresa_padrao=$_SESSION['nome_empresa_padrao'];

        if(isset($nome_empresa)){
            $result_nome_empresa=mysqli_query($conec,"UPDATE empresa SET nome='$nome_empresa' WHERE nome='$nome_empresa_padrao'");
        }
        if(isset($nome_fantasia)){
            $result_nome_fantasia=mysqli_query($conec,"UPDATE empresa SET nome_fantasia='$nome_fantasia' WHERE nome_fantasia='$nome_fantasia_padrao'");
        }

        setcookie('empresa', '', time() - 3600, '/');

        header('Location:'.$local.'?'.md5('livre=true'));
        exit;

    }
}

?>