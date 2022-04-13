<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Perfil</title>

    <!--     Fonts and icons     -->
    <link rel="stylesheet" href="https://use.typekit.net/kog7goj.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <!-- CSS Files -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
    
    <link href="assets/css/style.css" rel="stylesheet"/>
    <link href="assets/css/popup.css" rel="stylesheet"/>
    <?php
      session_start();
      error_reporting(E_ERROR | E_PARSE);


      $dbHost     = 'localhost';
      $dbUname = 'root';
      $dbPass = '';
      $dbName     = 'kairos';
      

      //if(!isset($_SESSION['email']) && !strpos($protocol . $_SERVER//['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
      //  header("Refresh:0; url=usuario".'?'.md5('erro=true'));
      //  exit;
      //} else {
      //  $email=$_SESSION['email'];
      //}
      $email = 'gabriel@gmail.com';
      $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

      $select=mysqli_query($conec, "SELECT * FROM usuario WHERE email = '$email'")->fetch_assoc();
      

      $id=$select['id'];
      $cpf=$select['cpf'];
      $_SESSION['email_padrao']=$select['email'];
      $_SESSION['nome_padrao']=$select['nome'];
      $_SESSION['cpf']=$select['cpf'];

      $select_telefone=mysqli_query($conec, "SELECT * FROM telefone WHERE cpf_usuario = '$cpf'");

      $result_telefone=$select_telefone->fetch_assoc();
      $numeros = '';

      while ($row = mysqli_fetch_assoc($select_telefone)) {
        if($row['tel'] != ""){
            $numeros .= $row["tel"].'<br>';
        }
      }

      $_SESSION['tel_padrao']=$result_telefone['tel'];

      $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE cpf_usuario = '$cpf'")->fetch_assoc();

      $select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE cpf_usuario = '$cpf'")->fetch_assoc();

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
                        <a class="nav-link" href="PerfilEmpresa/empresa">
                            <i class="nc-icon nc-chart-bar-32"></i>
                            <p>Perfil da Empresa</p>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="AnaliseMarketing/resultado.php">
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
                    
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
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
                                    <form action="assets/php/enviar_usuario" method="POST" id='dados' onsubmit="return false">
                                        <div class="row">
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" class="form-control none" id='nome_input' name='nome' onkeyup="apenasLetras(this)" maxlength="50">
                                                    <div id='nome' class='text-secondary'>
                                                        <a><?= $select['nome'] ?></a>
                                                    </div>
                                                </div>
                                                <div class='none alerta' id='nome_inputAlert'></div>
                                            </div>

                                            <div class="col-md-3 px-1">
                                                <div class="form-group">
                                                    <label>CPF</label>
                                                    <div class='text-secondary'><a><?= $select['cpf'] ?></a></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 pl-1">
                                                <div class="form-group">
                                                    <label>Email</label>
                                                    <input type="email" class="form-control none" id='email_input' name='email'>
                                                    <div id='email' class='text-secondary'><a><?= $select['email'] ?></a></div>
                                                </div>
                                                <div class='none alerta' id='email_inputAlert'></div>
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
                                                            <a><?= '<br>'.$numeros ?></a>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 pr-1">
                                                <div class="form-group">
                                                    <label>CEP</label>
                                                    <input type="tel" class="form-control none" id='cep_input' onkeypress="$(this).mask('00.000-000')" onkeyup="ler_cep(this)" name='cep' maxlength="15">
                                                    <div id='cep' class='text-secondary' ><a><?= $select_endereco['cep'] ?></a></div>
                                                </div>
                                                <div class='none alerta' id='cep_inputAlert'></div>
                                            </div>

                                            <div class="col-md-4 px-1">
                                                <div class="form-group">
                                                    <label>Número</label>
                                                    <input type="tel" class="form-control none small-input" id='numero_input' pattern="[0-9]" name='numero' maxlength="15">
                                                    <div id='numero' class='text-secondary'><a><?= $select_endereco['numero'] ?></a></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Endereço</label>
                                                    <div class='text-secondary'>
                                                        <input type="text" name='rua' class='none' value='<a><?= ucwords($select_endereco['rua']) ?></a>'>
                                                        <input type="text" name='bairro' class='none' value='<a><?= ucwords($select_endereco['bairro']) ?></a>'>
                                                        <input type="text" name='cidade' class='none' value='<a><?= ucwords($select_endereco['cidade']) ?></a>'>
                                                        <input type="text" name='estado' class='none' value='<a><?= ucwords($select_endereco['estado']) ?></a>'>
                                                        <p id='endereco'><a><?= ucwords($select_endereco['rua']) ?>, <?= ucwords($select_endereco['bairro']) ?>, <?= ucwords($select_endereco['cidade']) ?>, <?= $select_endereco['estado'] ?></a></p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Assinatura</label>
                                                    <br>
                                                    <button class="btn btn-info btn-fill pull-left none" id='assinarbtn' onclick="assinar()"><div class='circle'></div>Assinar Plano</button>
                                                    <div id='plano' class='text-secondary'><a><?= ucwords($select_cartao['assinatura']) ?></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" id='senha'>
                                            <div class="form-group">
                                                <div class='col-md-12'>
                                                    <label class='senha'>Senha</label>
                                                    <br>
                                                    <button class="btn btn-info btn-fill pull-left" onclick="editar(this)" type="submit" id="editarsenha"><div class='circle'></div>Editar Senha</button>
                                                    <div class='row' style="margin-left: 0; margin-right: 0;">

                                                    <div class="none" id='pass'>
                                                        <div class='texto'>Senha antiga</div>
                                                        <p>
                                                        <input type="password" id='senha_antiga' name='senha_antiga'>
                                                        <i class="bi bi-eye-slash" id="togglePassword_antigo"></i>
                                                        </p>
                                                    </div>

                                                    <div class="none" id='pass2'>
                                                        <div class='texto'>Senha nova</div>
                                                        <p>
                                                            <input type="password" id='senha_nova' name='senha_nova'>
                                                            <i class="bi bi-eye-slash" id="togglePassword_novo"></i>
                                                        </p>
                                                        <span id="StrengthDisp" class="badge displayBadge">Validando senha...</span>
                                                        <br>
                                                    </div>
                                                    
                                                    <div class="none" id='pass3'>
                                                        <div class='texto'>Digite Novamente</div>
                                                        <p>
                                                        <input type="password" id='senha_nova_dup' name='senha_nova_dup'>
                                                        <i class="bi bi-eye-slash" id="togglePassword_novo_dup"></i>
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                                <div class='none alerta' id='senha_antigaAlert'></div>
                                            </div>
                                        </div>
                        
                                        </div>
                                        <button class="btn btn-info btn-fill pull-right" id='editarbtn' onclick="editar(this)"><div class='circle'></div>Editar</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='salvarbtn' onclick="salvar(this)"><div class='circle'></div>Salvar</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='cancelarbtn' onclick="cancelar(this)"><div class='circle'></div>Cancelar</button>

                                        <button class="btn btn-info btn-fill pull-right none" id='salvar_senhabtn' onclick="salvar(this)"><div class='circle'></div>Salvar Alteração</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='cancelar_senhabtn' onclick="cancelar(this)"><div class='circle'></div>Cancelar</button>
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
                                <a href="../Contato/contato" id='suporte'>Suporte</a>
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

<script src="assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="assets/js/core/bootstrap.min.js" type="text/javascript"></script>

<script src="assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>
</html>
