<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
    <?php
    session_start();

        //ini_set('display_errors', '1');
        //ini_set('display_startup_errors', '1');
        //error_reporting(E_ALL);

        $dbHost     = 'localhost';
        $dbUname = 'root';
        $dbPass = '';
        $dbName     = 'kairos';
        $cpf = '185.311.040-09';

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
            $limpo = '';
            if(is_int(strpos($valor, '%3c'))){
                $valor = str_replace('%3c','',$valor);
                $valor = str_replace('%3e','',$valor);
            }

            //echo $chave.' = '.$valor.'<br>';

            if (is_int(strpos($chave, 'SWOT'))){ // análise SWOT
            switch (true) {
                case is_int(strpos($chave,'forças')):
                    $fortes .= $valor.'<br>';
                    break;
                case is_int(strpos($chave, 'fraquezas')):
                    $fracos .= $valor.'<br>';
                    break;
                case is_int(strpos($chave, 'oportunidades')):
                    $oportunidades .= $valor.'<br>';
                    break;
                case is_int(strpos($chave, 'competidores')) && is_int(strpos($valor, 'Sim')):
                    $ameacas .= 'Competição em Crescimento'.'<br>';
                    break;
                case is_int(strpos($chave, 'visão')) && is_int(strpos($valor, 'Sim')):
                    $ameacas .= 'Visão Negativa'.'<br>';
                    break;
                case is_int(strpos($chave, 'custos')) && is_int(strpos($valor, 'Sim')):
                    $ameacas .= 'Altos custos de matéria prima'.'<br>';
                    break;
                }
            } else if (is_int(strpos($chave, '4PS'))){ // metodologia 4P's
                switch (true) {
                    case is_int(strpos($chave,'produto')):
                        $produto .= $valor.'<br>';
                        break;
                    case is_int(strpos($chave,'preço')) && !is_int(strpos($valor, 'Sim')):
                        $preco .= $valor.'<br>';
                        break;
                    case is_int(strpos($chave,'praça')):
                        $praca .= $valor.'<br>';
                        break;
                    case is_int(strpos($chave,'promoção')):
                        $promocao .=$valor.'<br>';
                        break;
                    case is_int(strpos($chave, '4PSpreçosensivel')) && is_int(strpos($valor, 'Sim')):
                        $ameacas .= 'Clientes Sensíveis ao Preço'.'<br>';
                        break;
                    }
            }

        }


        $result_swot=mysqli_query($conec, "INSERT INTO analise_swot(cpf_usuario, forcas, fraquezas, oportunidades, ameacas) VALUES('$cpf', '".str_replace('<br>',', ',$fortes)."', '".str_replace('<br>',', ',$fracos)."', '".str_replace('<br>',', ',$oportunidades)."', '".str_replace('<br>',', ',$ameacas)."')");

        $result_4ps=mysqli_query($conec, "INSERT INTO analise_4ps(cpf_usuario, produto, preço, praça, promoção) VALUES('$cpf', '".str_replace('<br>',', ',$produto)."', '".str_replace('<br>',', ',$preco)."', '".str_replace('<br>',', ',$praca)."', '".str_replace('<br>',', ',$promocao)."')");

        ?>
</head>
<body>
    <div class="d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row bg-white">
                <div class="col text-primary">Forças
                    <div class="text-secondary">
                        <a><?= $fortes; ?></a>
                    </div>
                </div>

                <div class="col text-primary">Fraquezas
                    <div class="text-secondary">
                        <a><?= $fracos; ?></a>
                    </div>

                </div>
                <div class="w-100"></div>
                <div class="col text-primary">Oportunidades
                    <div class="text-secondary">
                        <a><?= $oportunidades; ?></a>
                    </div>
                </div>

                <div class="col text-primary">Ameaças
                    <div class="text-secondary">
                        <a><?= $ameacas; ?></a>
                    </div>
                </div>
            </div>
            <br>
            <hr>
            <br>
            <div class="row bg-white">
                <div class="col text-primary">Produto
                    <div class="text-secondary">
                        <a><?= $produto; ?></a>
                    </div>
                </div>

                <div class="col text-primary">Preço
                    <div class="text-secondary">
                        <a><?= $preco; ?></a>
                    </div>
                </div>

                <div class="col text-primary">Praça
                    <div class="text-secondary">
                        <a><?= $praca; ?></a>
                    </div>
                </div>

                <div class="col text-primary">Promoção
                    <div class="text-secondary">
                        <a><?= $promocao; ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>