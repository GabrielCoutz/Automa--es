<?php
session_start();

if(isset($_GET['analise'])){
    header('Location: ../../ColetarDados/ColetadeDados');
    exit;
}

?>