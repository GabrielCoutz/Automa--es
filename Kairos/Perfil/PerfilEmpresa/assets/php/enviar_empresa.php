<?php
session_start();
error_reporting(E_ERROR | E_PARSE);
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

$local='../../empresa';
$duplicado = false;
$email = $_SESSION['email_padrao'];

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

if(isset($_GET['cadastrar'])){
    $_SESSION['cadastro']=md5('valido');
    header('Location: ../../../../CadastroEmpresa/cadastro_empresa?'.md5('cadastro=true'));
    exit;
}

if($_POST['ramo_input'] != $_SESSION['ramo_padrao']){ // alteração de ramo
    $ramo=$_POST['ramo_input'];
    $result_ramo=mysqli_query($conec,"UPDATE empresa SET ramo='$ramo' WHERE email_usuario='$email'");

    verificarOperacao($result_ramo, $local); // verifica se a operação foi feita com sucesso
}

if(isset($_COOKIE['endereco_empresa'])){ // alteração do endereco da empresa

    $cep_empresa = $_POST['cep_empresa_input'];
    $numero_empresa = $_POST['numero_empresa_input'];
    $rua_empresa = $_POST['rua_empresa_input'];
    $bairro_empresa = $_POST['bairro_empresa_input'];
    $cidade_empresa = $_POST['cidade_empresa_input'];
    $estado_empresa = $_POST['estado_empresa_input'];
    $cnpj_padrao=$_SESSION['cnpj_padrao'];

    $result_endereco_empresa=mysqli_multi_query($conec,"UPDATE endereco_empresa SET cep='$cep_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET rua='$rua_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET numero='$numero_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET bairro='$bairro_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET cidade='$cidade_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET estado='$estado_empresa' WHERE cnpj_empresa='$cnpj_padrao';");

    setcookie('endereco_empresa', '', time() - 3600, '/');

    verificarOperacao($result_endereco_empresa, $local); // verifica se a operação foi feita com sucesso
}

if(isset($_COOKIE['empresa'])) { // alteração de dados empresa

    if(!empty($_POST['nome_empresa_input'])){ // verificação se o nome digitado já existe
        $nome_empresa = $_POST['nome_empresa_input'];
        $select_nome_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE nome ='$nome_empresa'");
        
        if($select_nome_empresa == $nome_empresa){ //sinalização de duplicação
            $local=$local.'?'.md5(('nome_empresa_duplicado=true'));
            $duplicado=true;
        }
    }

    if(!empty($_POST['nome_fantasia_input'])){ // verificação se o nome digitado já existe
        $nome_fantasia = $_POST['nome_fantasia_input'];
        $select_nome_fantasia=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_fantasia ='$nome_fantasia'");

        if($select_nome_fantasia == $nome_fantasia){ //sinalização de duplicação
            $local=$local.'?'.md5(('nome_fantasia_duplicado=true'));
            $duplicado=true;
        }
    }

    if($duplicado){ //retorno da verificação
        setcookie('empresa', '', time() - 3600, '/');
        header('Location: '.$local);
        exit;

    } else { // se não, atualiza os nomes digitados
        setcookie('empresa', '', time() - 3600, '/');

        if(isset($nome_empresa)){
            $result_nome_empresa=mysqli_query($conec,"UPDATE empresa SET nome='$nome_empresa' WHERE email_usuario='$email'");
            verificarOperacao($result_nome_empresa, $local); // verifica se a operação foi feita com sucesso
        }

        if(isset($nome_fantasia)){
            $result_nome_fantasia=mysqli_query($conec,"UPDATE empresa SET nome_fantasia='$nome_fantasia' WHERE email_usuario='$email'");
            verificarOperacao($result_nome_fantasia, $local); // verifica se a operação foi feita com sucesso
        }

        header('Location:'.$local.'?'.md5('sucesso=true'));
        exit;
    }
}

?>