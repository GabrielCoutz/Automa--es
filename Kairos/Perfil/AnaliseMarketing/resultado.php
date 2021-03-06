<!DOCTYPE html>
 <html lang="pt-BR">
 
 <head>
     <meta charset="utf-8" />
     <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
     <link rel="shortcut icon" href="../../assets/img/favicon/favicon.ico" type="image/x-icon">
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
     <title>Minhas Análises</title>
     <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

     <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
     <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
     
     <link href="assets/css/style.css" rel="stylesheet" />
     <link href="../../assets/css/popup.css" rel="stylesheet" />

    <?php
        error_reporting(E_ERROR | E_PARSE);
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
        $email=$_SESSION['email_padrao'];
        $select_swot=mysqli_query($conec, "SELECT * FROM analise_swot WHERE email_usuario = '$email'")->fetch_assoc();
        $select_4ps=mysqli_query($conec, "SELECT * FROM analise_4ps WHERE email_usuario = '$email'")->fetch_assoc();

        switch (true) {
            case !isset($_SESSION['email_padrao']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true')):
                header("Refresh:0; url=resultado".'?'.md5('erro=true'));
                exit;
                break;
            
            case !$select_swot && !$select_4ps && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('analise=false')) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('sucesso=false')) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true')):
                header("Refresh:0; url=resultado".'?'.md5('analise=false'));
                exit;
                break;
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
		<!-- preloader end -->
     <div class="wrapper">
         <div class="sidebar" data-image="assets/img/sidebar-6.jpg">
             <div class="sidebar-wrapper">
                 <ul class="nav">
                     <li>
                         <a class="nav-link" href="../usuario">
                             <i class="nc-icon nc-circle-09"></i>
                             <p>Perfil do Usuário</p>
                         </a>
                     </li>
                     <li>
                         <a class="nav-link" href="../PerfilEmpresa/empresa">
                             <i class="nc-icon nc-chart-bar-32"></i>
                             <p>Perfil da Empresa</p>
                         </a>
                     </li>
                     <li>
                        <a class="nav-link" href="../../Assinaturas/assinatura">
                            <i class="nc-icon nc-credit-card"></i>
                            <p>Assinatura</p>
                        </a>
                    </li>
                 </ul>
             </div>
         </div>
         <div class="main-panel">
             <!-- Navbar -->
             <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                 <div class="container-fluid">
                     <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                     </button>
                     <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="nav navbar-nav" id='ul-auto'>
                            <li class='nav-item' id='btnfechar'>
                                <a class="nav-link" onclick="fechar_menu()">
                                    <i class="nc-icon nc-stre-left"></i>
                                    <span >Fechar Menu</span>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" onclick="sair()" id='btnsair'>
                                <i class="nc-icon nc-simple-remove"></i>
                                    <span class="no-icon">Sair</span>
                                </a>
                            </li>

                            <li class='nav-item'>
                                <button class='btn' onclick="sair()" id='btnsair-v'>Sair</button>
                            </li>
                        </ul>
                    </div>
             </nav>
             <!-- End Navbar -->
             <div class="content">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8">
                             <div class="card">
                                 <div class="card-header">
                                     <h4 class="card-title">Minha Análise</h4>
                                 </div>
                                 <div class="card-body">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <div class="container">
                                            <div class="row bg-white" id='caixa-swot'>
                                                <div class="card-header" id='titulo-swot'>Matriz SWOT</div>
                                                    <div class='row' id='swot'>
                                                        
                                                        <div class="col text-primary" id='forcas'>Forças
                                                            <div class="text-secondary">
                                                                <a><?= str_replace(', ','<br>',$select_swot['forcas']); ?></a>
                                                            </div>
                                                        </div>

                                                        <div class="col text-primary" id='fraquezas'>Fraquezas
                                                            <div class="text-secondary">
                                                                <a><?= str_replace(', ','<br>',$select_swot['fraquezas']); ?></a>
                                                            </div>
                                                        </div>

                                                        <div class="w-100"></div>
                                                        
                                                        <div class="col text-primary" id='oportunidades'>Oportunidades
                                                            <div class="text-secondary">
                                                                <a><?= str_replace(', ','<br>',$select_swot['oportunidades']); ?></a>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="col text-primary" id='ameacas'>Ameaças
                                                            <div class="text-secondary">
                                                                <a><?= str_replace(', ','<br>',$select_swot['ameacas']); ?></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <div>
                                                    <div class="card-header">
                                                        <h4 class="card-title" id='orientacao'>Instruções SWOT</h4>
                                                    </div>
                                                    <div id='orientacao-texto'>
                                                        Neste momento é necessário fazer o relacionamento entre cada item da matriz SWOT. Para que norteie futuras tomadas de deciões. Utilize as informações acima a fim de basear estratégias benéficas para a administração em sua empresa. Interaja com o mouse ou clique nos itens abaixo para auxiliar na visualização:
                                                    </div>
                                                        <ul>
                                                            <li id='orientacao-fxf'>Forças + Oportunidades: quais pontos fortes da empresa podem ser potencializados para maximizar as oportunidades identificadas?</li>
                                                            <li id='orientacao-fxa'>
                                                            Forças + Ameaças: quais pontos fortes da empresa podem ser potencializados para minimizar o impacto das ameaças?
                                                            </li>
                                                            <li id='orientacao-fzxo'>
                                                            Fraquezas + Oportunidades: quais pontos fracos podem ser corrigidos para aproveitar as oportunidades levantadas?
                                                            </li>
                                                            <li id='orientacao-fzxa'>
                                                            Fraquezas + Ameaças: quais pontos fracos podem ser corrigidos para minimizar o efeito das ameaças?
                                                            </li>
                                                        </ul>
                                                </div>
                                            </div>

                                            <hr>

                                            <div class="row bg-white"id='caixa-4ps'>
                                                <div class="card-header" id='titulo-4ps'>4P's</div>
                                                <div class='d-flex' id='Qps'>
                                                    <div class="col text-primary" id='produto'>Produto
                                                        <div class="text-secondary">
                                                            <a><?= str_replace(', ','<br>',$select_4ps['produto']); ?></a>
                                                        </div>
                                                    </div>

                                                    <div class="col text-primary" id='preco'>Preço
                                                        <div class="text-secondary">
                                                            <a><?= str_replace(', ','<br>',$select_4ps['preco']); ?></a>
                                                        </div>
                                                    </div>

                                                    <div class="col text-primary" id='praca'>Praça
                                                        <div class="text-secondary">
                                                            <a><?= str_replace(', ','<br>',$select_4ps['praca']); ?></a>
                                                        </div>
                                                    </div>

                                                    <div class="col text-primary" id='promocao'>Promoção
                                                        <div class="text-secondary">
                                                            <a><?= str_replace(', ','<br>',$select_4ps['promocao']); ?></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="card-header">
                                                        <h4 class="card-title" id='orientacao'>Instruções 4P's</h4>
                                                    </div>
                                                    <div id='orientacao-texto'>
                                                        É o alinhamento dessas variáveis que irá compor toda a estratégia de marketing da sua empresa. Pense nelas como peças de um quebra-cabeça que irão se encaixar para formar o todo. Com os 4 Ps encaixados e bem alinhados, você comunicará aos consumidores o posicionamento da sua marca e irá promover o desejo de compra no seu público-alvo.
                                                        Na definição de público-alvo, você já pode aplicar questionários e entrevistas que investiguem os comportamentos dos consumidores. Mas, para cada P, também é possível pensar em pesquisas específicas. Como:
                                                    </div>
                                                    <ul>
                                                        <li id='orientacao-preco'>
                                                            Preço: Teste de produto como percepção de valor, pesquisa de elasticidade de preço. Quanto o consumidor se dispõe a pagar?
                                                        </li>
                                                        <li id='orientacao-produto'>
                                                            Produto: Teste de produto como aceitação, pesquisa de satisfação e análise da concorrência.
                                                        </li>
                                                        <li id='orientacao-praca'>
                                                            Praça: Pesquisa de avaliação de ponto de venda.
                                                        </li>
                                                        <li id='orientacao-promocao'>
                                                            Promoção: Pesquisa da persona que compraria seu produto, pesquisa de seus hábitos de consumo.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <footer class="footer">
                <div class="container-fluid">
                    <nav>
                        <ul class="footer-menu">
                            <li>
                                <a href="../../index" id='paginaInicial'>
                                    Página Inicial
                                </a>
                            </li>
                            <li>
                                <a href="../../Contato/contato" id='suporte' target="_blank">Suporte</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
         </div>
     </div>
 </body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
<script src="../../assets/js/popup.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>
 
</html>