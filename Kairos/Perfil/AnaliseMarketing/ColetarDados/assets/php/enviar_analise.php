<?php
    session_start();

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';
    $cpf = $_SESSION['cpf'];

    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    // SWOT
    $fortes = '';
    $fracos = '';
    $oportunidades = '';
    $ameacas = '';


    // 4Ps
    $produto = '';
    $preco = '';
    $praca = '';
    $promocao = '';

    foreach ($_GET as $chave => $valor) { 
        if(is_int(strpos($valor, '%3c'))){
            $valor = str_replace('%3c','',$valor);
            $valor = str_replace('%3e','',$valor);
        }
        if(is_int(strpos($valor, '<br>'))){
            $valor = str_replace('<br>',', ',$valor);
        }

        //echo $chave.' = '.$valor.'<br>';

        if (is_int(strpos($chave, 'SWOT'))){ // análise SWOT
        switch (true) {
            case is_int(strpos($chave,'forças')):
                $fortes .= $valor.', ';
                break;
            case is_int(strpos($chave, 'fraquezas')):
                $fracos .= $valor.', ';
                break;
            case is_int(strpos($chave, 'oportunidades')):
                $oportunidades .= $valor.', ';
                break;
            case is_int(strpos($chave, 'competidores')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Competição em Crescimento'.', ';
                break;
            case is_int(strpos($chave, 'visão')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Visão Negativa'.', ';
                break;
            case is_int(strpos($chave, 'custos')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Altos custos de matéria prima'.', ';
                break;
            }
        } else if (is_int(strpos($chave, '4PS'))){ // metodologia 4P's
            switch (true) {
                case is_int(strpos($chave,'produto')):
                    $produto .= $valor.', ';
                    break;
                case is_int(strpos($chave,'preço')) && !is_int(strpos($valor, 'Sim')):
                    $preco .= $valor.', ';
                    break;
                case is_int(strpos($chave,'praça')):
                    $praca .= $valor.', ';
                    break;
                case is_int(strpos($chave,'promoção')):
                    $promocao .=$valor.', ';
                    break;
                case is_int(strpos($chave, '4PSpreçosensivel')) && is_int(strpos($valor, 'Sim')):
                    $ameacas .= 'Clientes Sensíveis ao Preço'.', ';
                    break;
                case is_int(strpos($chave, '4PSpreçosensivel')) && is_int(strpos($valor, 'Não')):
                    break;
                }
        }
    }


    $result_swot=mysqli_query($conec, "INSERT INTO analise_swot(cpf_usuario, forcas, fraquezas, oportunidades, ameacas) VALUES('$cpf', '$fortes', '$fracos', '$oportunidades', '$ameacas')");

    $result_4ps=mysqli_query($conec, "INSERT INTO analise_4ps(cpf_usuario, produto, preço, praça, promoção) VALUES('$cpf', '$produto', '$preco', '$praca', '$promocao')");

    if($result_4ps && $result_swot){
        header('Location: ../../../resultado?'.md5('sucesso=true'));
        exit;
    } else {
        header('Location: ../../../resultado?'.md5('sucesso=false'));
        exit;
    }

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>