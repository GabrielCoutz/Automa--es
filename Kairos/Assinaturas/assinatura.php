<!DOCTYPE html>

<html class="no-js" lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="assets/css/bootstrap-5.0.0-beta2.min.css" />
    <link rel="stylesheet" href="../assets/css/popup.css">

    <link rel="stylesheet" href="assets/css/LineIcons.2.0.css" />

    <link rel="stylesheet" href="assets/css/tiny-slider.css" />

    <link rel="stylesheet" href="assets/css/animate2.css" />

    <link rel="stylesheet" href="assets/css/main.css" />



    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">



    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

    <script src="assets/js/validar.js"></script>

    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>



    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">

    <title>Assinaturas</title>

    <?php

    session_start();

    error_reporting(E_ERROR | E_PARSE);

	if(!isset($_SESSION['cadastro']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){

		header("Refresh:0; url=assinatura".'?'.md5('erro=true'));
        exit;
	}
    ?>


</head>

<body>

    <div class="preloader">

        <div class="loader">

            <div class="spinner">

            <div class="spinner-container">

                <div class="spinner-rotator">

                <div class="spinner-left">

                    <div class="spinner-circle"></div>

                </div>

                <div class="spinner-right">

                    <div class="spinner-circle"></div>

                </div>

                </div>

            </div>

            </div>

        </div>

        </div>

        <div>

        <section class="bg-light py-5 border-bottom mouseoff" id="pricing">

            <input type="text" name='assinatura' class="none" value='123'>

                <div class="container px-5 my-5">

                    <div class="text-center mb-5">

                        <h2 class="fw-bolder fadeInDown">Planos de Serviço</h2>

                        <p class="lead mb-0 fadeInUp">Seu negócio, suas regras.</p>

                    </div>

                    <div class="row gx-5 justify-content-center">

                        <!-- Pricing card free-->

                        <div class="col-lg-6 col-xl-4 fadeInUp">

                            <div class="card mb-5 mb-xl-0">

                                <div class="card-body p-5">

                                    <div class="small text-uppercase fw-bold text-muted">Básico</div>

                                    <div class="mb-3">

                                        <span class="display-4 fw-bold">R$ 19,00</span>

                                        <span class="fw-bold">/mês</span>

                                    </div>

                                    <ul class="list-unstyled mb-4">

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Definição de Cores

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Atendimento seg à sex

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Suporte 8 às 18:00

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            1 Visita física p/mês

                                        </li>

                                        <li class="mb-2 text-muted">

                                            <i class="bi bi-x"></i>

                                            Consultoria de Marketing

                                        </li>

                                        <li class="mb-2 text-muted">

                                            <i class="bi bi-x"></i>

                                            Dedicated support

                                        </li>

                                        <li class="mb-2 text-muted">

                                            <i class="bi bi-x"></i>

                                            Plano de Negócios

                                        </li>

                                        <li class="text-muted">

                                            <i class="bi bi-x"></i>

                                            Análise de Resultados

                                        </li>

                                    </ul>

                                    <div class="d-grid"><a href="../CadastroCartao/cadastro_cartao?plano=básico"class="btn btn-outline-primary">Escolher Plano</a></div>

                                </div>

                            </div>

                        </div>

                        <!-- Pricing card pro-->

                        <div class="col-lg-6 col-xl-4 fadeInUp">

                            <div class="card mb-5 mb-xl-0">

                                <div class="card-body p-5">

                                    <div class="small text-uppercase fw-bold">

                                        <i class="bi bi-star-fill text-warning"></i>

                                        Intermediário

                                    </div>

                                    <div class="mb-3">

                                        <span class="display-4 fw-bold">R$ 35,00</span>

                                        <span class="fw-bold">/mês</span>

                                    </div>

                                    <ul class="list-unstyled mb-4">

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Definição de Cores

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Atendimento seg à sex

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Suporte 24h

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            3 Visitas Físicas p/mês

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Consultoria de Marketing

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Dedicated support

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-x"></i>

                                            Plano de Negócios

                                        </li>

                                        <li class="text-muted">

                                            <i class="bi bi-x"></i>

                                            Análise de Resultados

                                        </li>

                                    </ul>

                                    <div class="d-grid"><a class="btn btn-primary" href="../CadastroCartao/cadastro_cartao?plano=intermediário">Escolher Plano</a></div>

                                </div>

                            </div>

                        </div>

                        <!-- Pricing card enterprise-->

                        <div class="col-lg-6 col-xl-4 fadeInUp">

                            <div class="card mb-5">

                                <div class="card-body p-5">

                                    <div class="small text-uppercase fw-bold text-muted">Premium</div>

                                    <div class="mb-3">

                                        <span class="display-4 fw-bold">R$ 45,00</span>

                                        <span class="fw-bold">/mês</span>

                                    </div>

                                    <ul class="list-unstyled mb-4">

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Definição de Cores

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Atendimento 24/7

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            xampson

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            5 Visitas Físicas p/mês

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Consultoria de Marketing

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Dedicated support

                                        </li>

                                        <li class="mb-2">

                                            <i class="bi bi-check text-primary"></i>

                                            Plano de Negócios

                                        </li>

                                        <li class="text-muted">

                                            <i class="bi bi-check text-primary"></i>

                                            Análise de Resultados

                                        </li>

                                    </ul>

                                    <div class="d-grid"><a class="btn btn-outline-primary" href="../CadastroCartao/cadastro_cartao?plano=premium">Escolher Plano</a></div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            </div>

</body>

</html>