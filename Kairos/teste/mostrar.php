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
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
        error_reporting(E_ALL);

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

        function validar($valor, $chave){ // valida se o valor passado é fraqueza ou força

            if(is_int(strpos($valor, 'Nada'))){
                return 'Ponto fraco: '.$chave.'<br>Motivo = '.$valor.'<br><br>';

            } else if (is_int(strpos($valor, 'Pouco'))){
                return 'Pode melhorar: '.$chave.'<br>Motivo = '.$valor.'<br><br>';

            } else if(is_int(strpos($valor, 'Muito'))){
                return 'Ponto forte: '.$chave.'<br>Motivo = '.$valor.'<br><br>';

            } else {
                return 'Ponto forte: '.$chave.'<br>Motivo = '.$valor.'<br><br>';

            }
        }

        foreach ($_GET as $chave => $valor) { 
            $limpo = '';

            if(is_int(strpos($chave, 'Empresa'))){ // seta os valores da empresa em pontos Fortes ou Fracos
                $limpo .= ucwords(str_replace('Empresa', '',$chave));
                
                if(is_int(strpos($valor, 'Nada'))|| is_int(strpos($valor, 'Pouco'))){
                    
                    $fracos .= $limpo.'<br>';
                } else {
                    
                    $fortes .= $limpo.'<br>';
                }
            }
            
            if(is_int(strpos($chave, 'cenario'))){ // seta os valores dos cenários externos em Ameaças ou Oportunidades

                $limpo =ucwords(str_replace('cenario', '',str_replace('_', ' ',$chave)));
                
                if(is_int(strpos($valor, 'Não'))){
                    $ameacas .= $limpo.'<br>';
                } else if (is_int(strpos($valor, 'Seria bom'))){
                    $oportunidades .= $limpo.'<br>';
                }
            }

            if(is_int(strpos($chave, 'oferecido'))){ // o que é oferecido ao cliente
                $oferecido = $valor;
            }

            if(is_int(strpos($chave, 'local'))){ // praça
                $limpo =ucwords(str_replace('_', ' ', $valor));
                $praca .= $limpo;

            }

            //echo validar($valor,$chave);
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
                        <a><?= $oferecido; ?></a>
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