<!DOCTYPE html>
 <html lang="pt-BR">
 
 <head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
    <link rel="shortcut icon" href="../../assets/img/favicon/favicon.ico" type="image/x-icon">

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Perfil Empresa</title>

    <!--     Fonts and icons     -->
    <link rel="stylesheet" href="https://use.typekit.net/kog7goj.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

    <!-- CSS Files -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />

    <link href="assets/css/popup.css" rel="stylesheet"/>
    <link href="assets/css/style.css" rel="stylesheet"/>

    <?php

use function PHPSTORM_META\type;

    session_start();

    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';
    
    error_reporting(E_ERROR | E_PARSE);

    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    $email=$_SESSION['email'];

    $select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE email = '$email'")->fetch_assoc();

    $cpf=$select['cpf'];

    $select_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE cpf_usuario = '$cpf'")->fetch_assoc();

    switch (true) {
        case !isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true')):
            header("Refresh:0; url=empresa".'?'.md5('erro=true'));
            exit;
            break;

        case empty($select_empresa['ramo']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('dados_empresa=false')) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true')):
            header("Refresh:0; url=empresa".'?'.md5('dados_empresa=false'));
            exit;
            break;
    }

    $_SESSION['ramo_padrao']=$select_empresa['ramo'];
    $_SESSION['nome_empresa_padrao']=$select_empresa['nome'];
    $_SESSION['nome_fantasia_padrao']=$select_empresa['nome_fantasia'];
    
    $cnpj=$select_empresa['cnpj'];
    $_SESSION['cnpj_padrao']=$cnpj;

    $select_empresa_endereco=mysqli_query($conec, "SELECT * FROM endereco_empresa WHERE cnpj_empresa = '$cnpj'")->fetch_assoc();
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
                         <a class="nav-link" href="../AnaliseMarketing/resultado">
                             <i class="nc-icon nc-bulb-63"></i>
                             <p>Análise de Marketing</p>
                         </a>
                     </li> 
                 </ul>
             </div>
         </div>
         <div class="main-panel">
             <!-- Navbar -->
            <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                <div class="container-fluid">
                    <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" onclick="abrir_menu()">
                        <span class="navbar-toggler-bar burger-lines"></span>
                        <span class="navbar-toggler-bar burger-lines"></span>
                        <span class="navbar-toggler-bar burger-lines"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="nav navbar-nav mr-auto">
                            <li class='nav-item' id='btnfechar'>
                                <a class="nav-link" onclick="fechar_menu()">
                                    <i class="nc-icon nc-stre-left"></i>
                                    <span >Fechar Menu</span>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" onclick="sair()" id='btnsair'>
                                    <i class="nc-icon nc-simple-remove"></i>
                                    <span >Sair</span>
                                </a>
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
                                    <h4 class="card-title">Sua Empresa</h4>
                                </div>
                                <div class="card-body">
                                    <form action="assets/php/enviar_empresa" id='dados_empresa' onsubmit="return false" method="POST">
                                        <div class="row">

                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <label>Nome da Empresa</label>
                                                    <input type="text" class="form-control none" id='nome_empresa_input' name='nome_empresa_input'>
                                                    <div id='nome_empresa' class='text-secondary'>
                                                        <a><?= $select_empresa['nome'] ?></a>
                                                    </div>
                                                </div>
                                                <div class='none alerta' id='nome_empresa_inputAlert'></div>
                                            </div>

                                            <div class="col-md-3 px-1">
                                                <div class="form-group">
                                                    <label>Nome Fantasia</label>
                                                    <input type="text" class="form-control none" id='nome_fantasia_input' name='nome_fantasia_input'>
                                                    <div id='nome_fantasia' class='text-secondary'>
                                                        <a><?= $select_empresa['nome_fantasia'] ?></a>
                                                    </div>
                                                </div>
                                                <div class='none alerta' id='nome_fantasia_inputAlert'></div>
                                            </div>

                                            <div class="col-md-4 pl-1">
                                                <div class="form-group">
                                                    <label>CNPJ</label>
                                                    <div class='text-secondary'>
                                                        <a><?= ucwords($select_empresa['cnpj']) ?></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Ramo</label>
                                                    <br>
                                                    <select class="form-group selectpicker select none" id="ramo_input" name="ramo_input"> 
                                                        <option value disabled selected>Selecione o Ramo</option>
                                                        <option>Alimentação</option>
                                                        <option>Saúde</option>
                                                        <option>Serviços</option>
                                                        <option>Tecnologia</option>
                                                        <option>Moda</option>
                                                    </select> 
                                                    <div class='text-secondary' id='ramo'>
                                                        <a><?= ucwords($select_empresa['ramo']) ?></a>
                                                    </div>
                                                </div>
                                                <div class='none alerta' id='ramo_inputAlert'></div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4 pr-1">
                                                <div class="form-group">
                                                    <label>CEP</label>
                                                    <input type="tel" class="form-control none" id='cep_empresa_input' onkeypress="$(this).mask('00.000-000')" onkeyup="ler_cep(this)" name='cep_empresa_input'>
                                                    <div id='cep_empresa' class='text-secondary' ><a><?= $select_empresa_endereco['cep'] ?></a></div>
                                                </div>
                                                <div class='none alerta' id='cep_empresa_inputAlert'></div>
                                            </div>

                                            <div class="col-md-4 px-1">
                                                <div class="form-group">
                                                    <label>Número</label>
                                                    <input type="tel" class="form-control none small-input" id='numero_empresa_input' pattern="[0-9]" name='numero_empresa_input' maxlength="15">
                                                    <div id='numero_empresa' class='text-secondary'><a><?= $select_empresa_endereco['numero'] ?></a></div>
                                                </div>
                                                <div class='none alerta' id='numero_empresa_inputAlert'></div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Endereço</label>
                                                    <div class='text-secondary'>
                                                        <input type="text" name='rua_empresa_input' class='none' value='<a><?= ucwords($select_empresa_endereco['rua']) ?></a>'>
                                                        <input type="text" name='bairro_empresa_input' class='none' value='<a><?= ucwords($select_empresa_endereco['bairro']) ?></a>'>
                                                        <input type="text" name='cidade_empresa_input' class='none' value='<a><?= ucwords($select_empresa_endereco['cidade']) ?></a>'>
                                                        <input type="text" name='estado_empresa_input' class='none' value='<a><?= ucwords($select_empresa_endereco['estado']) ?></a>'>
                                                        <p id='endereco_empresa'><a><?= ucwords($select_empresa_endereco['rua']) ?>, <?= ucwords($select_empresa_endereco['bairro']) ?>, <?= ucwords($select_empresa_endereco['cidade']) ?>, <?= $select_empresa_endereco['estado'] ?></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                            <button class="btn btn-info btn-fill pull-right" id='editarbtn' onclick="editar()"><div class='circle'></div>Editar</button>
                                            <button class="btn btn-info btn-fill pull-right none" id='salvarbtn' onclick="salvar()"><div class='circle'></div>Salvar</button>
                                            <button class="btn btn-info btn-fill pull-right none" id='cancelarbtn' onclick="cancelar()"><div class='circle'></div>Cancelar</button>
                                    </form>
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
                                <a href="../index" id='paginaInicial'>
                                    Página Inicial
                                </a>
                            </li>
                            <li>
                                <a href="../../Contato/contato" id='suporte'>Suporte</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    </div>
</body>
 <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="assets/js/core/bootstrap.min.js" type="text/javascript"></script>

<script src="assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>

</html>
