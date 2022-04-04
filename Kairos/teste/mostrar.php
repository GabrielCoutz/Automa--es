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
        //ini_set('display_errors', '1');
        //ini_set('display_startup_errors', '1');
        //error_reporting(E_ALL);

        // SWOT
        $fortes = '';
        $fracos = '';
        $oportunidades = '';
        $ameacas = '';

        $oferecido = '';

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

            echo $chave.' = '.$valor.'<br>';

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
                        $ameacas .= 'Cliente Sensíveis ao Preço'.'<br>';
                        break;
                    }
            }


            //if(is_int(strpos($chave, 'oferecido'))){ // o que é //oferecido ao cliente
            //    $oferecido = $valor;
            //}
//
            //if(is_int(strpos($chave, 'local'))){ // praça
            //    $limpo =ucwords(str_replace('_', ' ', $valor));
            //    $praca .= $limpo;
//
            //}

        }

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