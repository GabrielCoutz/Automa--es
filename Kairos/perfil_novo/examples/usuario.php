<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Perfil</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
    <!-- CSS Files -->
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
    
    <link href="../assets/css/style.css" rel="stylesheet" />
    <?php
      session_start();


      $dbHost     = 'localhost';
      $dbUname = 'root';
      $dbPass = '';
      $dbName     = 'kairos';
      error_reporting(E_ERROR | E_PARSE);
      

      $email='gabriel@gmail.com';

      $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

      $select=mysqli_query($conec, "SELECT * FROM usuario WHERE email = '$email'");
      $result=$select->fetch_assoc();

      $id=$result['id'];
      $cpf=$result['cpf'];
      $_SESSION['email_padrao']=$result['email'];
      $_SESSION['cpf']=$result['cpf'];

      $select_telefone=mysqli_query($conec, "SELECT * FROM telefone WHERE cpf_usuario = '$cpf'");

      $result_telefone=$select_telefone->fetch_assoc();
      $teste = '';

      while ($row = mysqli_fetch_assoc($select_telefone)) {
        if($row['tel'] != ""){
            $teste=$teste.$row["tel"].'<br>';
        }
      }

      $_SESSION['tel_padrao']=$result_telefone['tel'];


      $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE cpf_usuario = '$cpf'");
      $result_endereco=$select_endereco->fetch_assoc();

      $select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE cpf_usuario = '$cpf'");
      $result_cartao=$select_cartao->fetch_assoc();

  ?>
</head>

<body>
    <div class="wrapper">
        <div class="sidebar" data-image="../assets/img/sidebar-6.jpg">
            <div class="sidebar-wrapper">
                
                <ul class="nav">
                    
                    <li>
                        <a class="nav-link" href="./usuario.php">
                            <i class="nc-icon nc-circle-09"></i>
                            <p>Perfil do Usuário</p>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="./empresa.php">
                            <i class="nc-icon nc-chart-bar-32"></i>
                            <p>Perfil da Empresa</p>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="./andamento_projeto.php">
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
                    <a class="navbar-brand" href="#pablo"> Usuario </a>
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
                </div>
            </nav>
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Seus dados</h4>
                                </div>
                                <div class="card-body">
                                    <form action="" method="POST" id='dados' onsubmit="return false">
                                        <div class="row">
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" class="form-control none" id='nome_input'>
                                                    <div id='nome' class='text-secondary'>
                                                        <a><?= ucwords($result['nome']) ?></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-3 px-1">
                                                <div class="form-group">
                                                    <label>CPF</label>
                                                    <div id='cpf' class='text-secondary'><a><?= $result['cpf'] ?></a></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 pl-1">
                                                <div class="form-group">
                                                    <label>Email</label>
                                                    <input type="email" class="form-control none" id='email_input'>
                                                    <div id='email' class='text-secondary'><a><?= $result['email'] ?></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Telefone</label>
                                                    <div class="phone-list">
                                                            <div class="input-group phone-input none" id='botoes_tel'>
                                                                <button class="btn btn-success btn-sm btn-add-phone" id='add_tel'><div class='circle'></div>Adicionar telefone</button>
                                                                <button class="btn btn-sm btn-del-phone" id='del_tel'><div class='circle'></div>Excluir telefone</button>
                                                            </div>
                                                    </div>
                                                        <div id='tel' class='text-secondary'>
                                                            <a><?= $result_telefone['tel']?></a>
                                                            <a><?= '<br>'.$teste ?></a>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 pr-1">
                                                <div class="form-group">
                                                    <label>CEP</label>
                                                    <input type="tel" class="form-control none" id='cep_input'>
                                                    <div id='cep' class='text-secondary' ><a><?= $result_endereco['cep'] ?></a></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 px-1">
                                                <div class="form-group">
                                                    <label>Número</label>
                                                    <input type="tel" class="form-control none" id='numero_input'>
                                                    <div id='numero' class='text-secondary'><a><?= $result_endereco['numero'] ?></a></div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Endereço</label>
                                                    <div class='text-secondary'>
                                                        <a><?= ucwords($result_endereco['bairro']) ?>, <?= ucwords($result_endereco['cidade']) ?>, <?= $result_endereco['estado'] ?></a>
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Assinatura</label>
                                                    <div id='plano' class='text-secondary'><a><?= ucwords($result_cartao['assinatura']) ?></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-info btn-fill pull-right" id='editarbtn' onclick="editar()">Editar</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='salvarbtn' onclick="salvar()">Salvar</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='cancelarbtn' onclick="cancelar()">Cancelar</button>
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
<script src="../assets/js/validar.js" type="text/javascript"></script>

<script src="../assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="../assets/js/core/bootstrap.min.js" type="text/javascript"></script>

<script src="../assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

</html>
