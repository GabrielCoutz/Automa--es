<!DOCTYPE html>
 <html lang="pt-BR">
 
 <head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">

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
    session_start();


    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';

    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    $email='gabriel@gmail.com';

    $select=mysqli_query($conec, "SELECT cpf FROM usuario WHERE email = '$email'")->fetch_assoc();

    $cpf=$select['cpf'];

    $select_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE cpf_usuario = '$cpf'")->fetch_assoc();
    
    $cnpj=$select_empresa['cnpj'];

    $select_empresa_endereco=mysqli_query($conec, "SELECT * FROM endereco_empresa WHERE cnpj_empresa = '$cnpj'")->fetch_assoc();




    ?>

 </head>
 
 <body>
     <div class="wrapper">
         <div class="sidebar" data-image="assets/img/sidebar-6.jpg">
             <div class="sidebar-wrapper">
                 
                 <ul class="nav">
                     
                     <li>
                         <a class="nav-link" href="../usuario.php">
                             <i class="nc-icon nc-circle-09"></i>
                             <p>Perfil do Usuário</p>
                         </a>
                     </li>
                     <li>
                         <a class="nav-link" href="">
                             <i class="nc-icon nc-chart-bar-32"></i>
                             <p>Perfil da Empresa</p>
                         </a>
                     </li>
                     <li>
                         <a class="nav-link" href="../AndamentoProjeto/projeto.php">
                             <i class="nc-icon nc-bulb-63"></i>
                             <p>Andamento do Projeto</p>
                         </a>
                     </li> 
                 </ul>
             </div>
         </div>
         <div class="main-panel">
             <!-- Navbar -->
             <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                 <div class="container-fluid">
                     <a class="navbar-brand" href="#pablo"> Empresa </a>
                     <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                     </button>
                     <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="nav navbar-nav mr-auto">
                            <li class="nav-item">
                                <a href="#" class="nav-link" data-toggle="dropdown">
                                    <i class="nc-icon nc-palette"></i>
                                    <span class="d-lg-none">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#pablo">
                                    <span class="no-icon">Log out</span>
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
                                     <form>
                                         <div class="row">
                                             <div class="col-md-5 pr-1">
                                                 <div class="form-group">
                                                     <label>Nome da Empresa</label>
                                                     <input type="text" class="form-control none" id='nome_empresa_input' name='nome_empresa'>
                                                     <div id='nome_empresa' class='text-secondary'>
                                                        <a><?= ucwords($select_empresa['nome']) ?></a>
                                                    </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-3 px-1">
                                                 <div class="form-group">
                                                     <label>Nome Fantasia</label>
                                                     <input type="text" class="form-control none" id='nome_fantasia_input' name='nome_fantasia'>
                                                     <div id='nome_fantasia' class='text-secondary'>
                                                        <a><?= ucwords($select_empresa['nome_fantasia']) ?></a>
                                                    </div>
                                                 </div>
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
                                                    <select class="form-group selectpicker select none" id="ramo_input" name="ramo_input"> 
                                                        <option value disabled selected>Selecione o Ramo</option>
                                                        <option>Alimentação</option>
                                                        <option>Construção</option>
                                                        <option>Educação</option>
                                                        <option>Entretenimento</option>
                                                        <option>Saúde</option>
                                                        <option>Serviços Pessoais</option>
                                                        <option>Tecnologia</option>
                                                        <option>Vendas</option>
                                                        <option>Vestuário</option>
                                                    </select> 
                                                    <div class='text-secondary' id='ramo'>
                                                        <a><?= ucwords($select_empresa['ramo']) ?></a>
                                                    </div>
                                                 </div>
                                             </div>
                                         </div>

                                         <div class="row">
                                            <div class="col-md-4 pr-1">
                                                <div class="form-group">
                                                    <label>CEP</label>
                                                    <input type="tel" class="form-control none" id='cep_empresa_input' onkeypress="$(this).mask('00.000-000')" onkeyup="ler_cep(this)" name='cep_empresa_input'>
                                                    <div id='cep_empresa' class='text-secondary' ><a><?= $select_empresa_endereco['cep'] ?></a></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 px-1">
                                                <div class="form-group">
                                                    <label>Número</label>
                                                    <input type="number" class="form-control none small-input" id='numero_empresa_input' pattern="[0-9]" name='numero'>
                                                    <div id='numero_empresa' class='text-secondary'><a><?= $select_empresa_endereco['numero'] ?></a></div>
                                                </div>
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
                                         <button type="submit" class="btn btn-info btn-fill pull-right">Update Profile</button>
                                         <div class="clearfix"></div>
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
                                 <a href="#">
                                     Home
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Company
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Portfolio
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Blog
                                 </a>
                             </li>
                         </ul>
                         <p class="copyright text-center">
                             ©
                             <script>
                                 document.write(new Date().getFullYear())
                             </script>
                             <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                         </p>
                     </nav>
                 </div>
             </footer>
         </div>
     </div>
 </body>
 <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>

<script src="assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="assets/js/core/bootstrap.min.js" type="text/javascript"></script>

<script src="assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
 
 </html>
 