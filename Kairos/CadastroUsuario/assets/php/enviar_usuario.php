<?php
session_start();

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
    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}

$nome=$_POST['nome'];
$tel=$_POST['tel'];
$senha=md5($_POST['senha']);
$email=$_POST['email'];

$duplicado=false;
$local='../../cadastro_usuario';

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

if(isset($_POST['g-recaptcha-response']) && $_POST['g-recaptcha-response'] != ""){
        $url='https://www.google.com/recaptcha/api/siteverify';
        $secret = '6Ld5L3oeAAAAAF7ExJjjJbY9EnWGQSyjCin5aGRL';
        $response = $_POST['g-recaptcha-response'];
        $variaveis = "secret=".$secret."&response=".$response;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $variaveis);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $resp = json_decode(curl_exec($ch));

        if ($resp->success != 1){
            $local=$local.'?'.md5('erro=true');
            header("Refresh:0; url=".$local);
            exit;
        }
    }


$select_email=mysqli_query($conec, "SELECT email FROM usuario WHERE email = '$email'")->fetch_assoc();

if(isset($select_email['email'])){ // email já utilizado
    $local=$local.'?'.md5('email=false');
    header("Refresh:0; url="."$local");
    exit;

} else {
    $result=mysqli_multi_query($conec, "INSERT INTO usuario(nome, email, senha) VALUES('$nome', '$email', '$senha');
                                        INSERT INTO telefone(email_usuario, tel) VALUES((SELECT email FROM usuario WHERE email = '$email'), '$tel')");
    
    verificarOperacao($result, $local);

    header('Location: ../../../Login/login?'.md5('sucesso=true'));
    exit;
}

?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

