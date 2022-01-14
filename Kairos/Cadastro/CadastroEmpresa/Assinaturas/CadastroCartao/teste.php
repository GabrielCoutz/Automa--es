<?php
session_start();

$assinatura = $_SESSION['assinatura'];
$num_cartao = $_POST['num_cartao'];
$titular = $_POST['nome_cartao'];
$cvv_cartao = $_POST['cvv_cartao'];

$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];

echo $assinatura;
echo $num_cartao;
echo $titular;
echo $cvv_cartao;
echo $validade;

?>