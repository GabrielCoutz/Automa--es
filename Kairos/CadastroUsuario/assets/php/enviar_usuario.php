<?php
session_start();

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$nome=$_POST['nome'];
$_SESSION['cpf'] = $_POST['cpf'];
$tel=$_POST['tel'];
$cpf=$_POST['cpf'];
$cep=$_POST['cep'];
$rua=$_POST['rua'];
$numero=$_POST['numero'];
$bairro=$_POST['bairro'];
$cidade=$_POST['cidade'];
$estado=$_POST['estado'];
$senha=md5($_POST['senha']);
$email=$_POST['email'];

$duplicado=false;
$local='../../cadastro_usuario';

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

$select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE cpf = '$cpf'")->fetch_assoc();

$select_email=mysqli_query($conec, "SELECT email FROM usuario WHERE email = '$email'")->fetch_assoc();

if(isset($select_email['email'])){
    $local=$local.'?'.md5('email=false');
    $duplicado=true;
}
if (isset($select['cpf'])){
    $local=$local.'?'.md5('cpf=false');
    $duplicado=true;
}

if($duplicado){
    header("Refresh:0; url="."$local");
    exit;

} else {
    $_SESSION['usr_data'] = "INSERT INTO usuario(nome,email,cpf,senha) VALUES('$nome','$email','$cpf','$senha')";

    $_SESSION['edr_data'] = "INSERT INTO endereco(cpf_usuario,cep,rua,numero,bairro,cidade,estado) VALUES((SELECT cpf FROM usuario WHERE cpf = '$cpf'),'$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')";
    
    $_SESSION['cell_data'] = "INSERT INTO telefone(cpf_usuario, tel) VALUES((SELECT cpf FROM usuario WHERE cpf = '$cpf'), '$tel')";
    header('Location: ../../../CadastroEmpresa/cadastro_empresa');
    exit;
}

?>

<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

