<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Perfil</title>

    <link rel="stylesheet" href="https://use.typekit.net/kog7goj.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="../assets/css/icones.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
    
    <link href="assets/css/style.css" rel="stylesheet"/>
    <link href="../assets/css/popup.css" rel="stylesheet"/>
    <link  href="../assets/css/jquery.passwordRequirements.css" rel="stylesheet">
    <?php
        session_start();
        error_reporting(E_ERROR | E_PARSE);


        $dbHost     = 'localhost';
        $dbUname = 'root';
        $dbPass = '';
        $dbName     = 'kairos';

        $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

        if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
            $dbHost = 'sql210.epizy.com';
            $dbUname = 'epiz_30663895';
            $dbPass = 'ndLdcOqYk0K';
            $dbName = 'epiz_30663895_Banco_Kairos';
            $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
        }
        

        //if(!isset($_SESSION['email']) && !strpos($protocol . $_SERVER//['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
        //  header("Refresh:0; url=usuario".'?'.md5('erro=true'));
        //  exit;
        //} else {
        //  $email=$_SESSION['email'];
        //}

        $email='gabriel@gmail.com';
        $select=mysqli_query($conec, "SELECT * FROM usuario WHERE email = '$email'")->fetch_assoc();

        $id=$select['id'];
        $cpf=$select['cpf'];
        if(empty($cpf)){
            $cpf = 'Não Cadastrado';
        } else {
            $cpf = substr($select['cpf'], 0, 3).'.***.***'.substr($select['cpf'], -3, 3);
        }
        $_SESSION['email_padrao']=$email;
        $_SESSION['nome_padrao']=$select['nome'];

        $select_telefone=mysqli_query($conec, "SELECT * FROM telefone WHERE email_usuario = '$email'");

        $result_telefone=$select_telefone->fetch_assoc();
        $numeros = '';

        while ($row = mysqli_fetch_assoc($select_telefone)) {
        if($row['tel'] != ""){
            $numeros .= $row["tel"].'<br>';
            }
        }

        $_SESSION['tel_padrao']=$result_telefone['tel'];

        $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE email_usuario = '$email'")->fetch_assoc();

        $select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE email_usuario = '$email'")->fetch_assoc();

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
                        <a class="nav-link" href="AnaliseMarketing/resultado">
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
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" style="box-shadow: none !important;" onclick="abrir_menu()">
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
                                                    <i class="bi bi-question-circle" id='nameTip'></i>
                                                    <span id='nameText'>Insira somente letras, sem caracteres especiais ou números.</span>
                                                    <input type="text" class="form-control" id='nome' name='nome' onkeyup="apenasLetras(this)" maxlength="50" value="<?= $select['nome'] ?>">
                                                </div>
                                                <div class='none alerta' id='nomeAlert'></div>
                                            </div>

                                            <div class="col-md-3 px-1">
                                                <div class="form-group">
                                                    <label>CPF</label>
                                                    <div class='text-secondary' id='cpf'>
                                                        <a><?= $cpf ?></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 pl-1">
                                                <div class="form-group">
                                                    <label>Email</label>
                                                    <input class="form-control none">
                                                    <div class='text-secondary'><a><?= $select['email'] ?></a></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Telefone</label>
                                                    <i class="bi bi-question-circle" id='telTip'></i>
                                                    <span id='telText'>Insira o DDD (xx) juntamente com o número completo xxxxx-xxxx.</span>
                                                    <div class="phone-list">
                                                        <div id='botoes_tel'>
                                                            <button class="btn btn-success btn-sm btn-add-phone" id='add_tel'>Adicionar telefone</button>
                                                            <button class="btn btn-sm btn-del-phone" id='del_tel'>Excluir telefone</button>
                                                        </div>
                                                    </div>
                                                        <div id='tel' class='text-secondary'>
                                                            <a><?= $result_telefone['tel']?></a>
                                                            <a><?= $numeros ?></a>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 pr-1">
                                                <div class="form-group">
                                                    <label>CEP</label>
                                                    <i class="bi bi-question-circle" id='cepTip'></i>
                                                    <span id='cepText'>Insira o CEP (xx.xxx-xxx) por completo.</span>
                                                    <input type="tel" class="form-control" id='cep' onkeypress="$(this).mask('00.000-000')" onkeyup="ler_cep(this)" name='cep' maxlength="15" value='<?= $select_endereco['cep'] ?>'>
                                                </div>
                                                <div class='none alerta' id='cepAlert'></div>
                                            </div>

                                            <div class="col-md-4 px-1">
                                                <div class="form-group">
                                                    <label>Número</label>
                                                    <i class="bi bi-question-circle" id='numeroTip'></i>
                                                    <span id='numeroText'>Insira apenas números.</span>
                                                    <input type="tel" class="form-control small-input" id='numero' name='numero' maxlength="15" value='<?= $select_endereco['numero'] ?>'>
                                                </div>
                                                <div class='none alerta' id='numeroAlert'></div>
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
                                        
                                        <div class="row" id='divplano'>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Assinatura</label>
                                                    <br>
                                                    <button class="btn btn-info btn-fill pull-left none" id='assinarbtn' onclick="assinar()">Assinar Plano</button>
                                                    <div id='plano' class='text-secondary'><a><?= ucwords($select_cartao['assinatura']) ?></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" id='senha'>
                                            <div class="form-group">
                                                <div class='col-md-12'>
                                                    <label class='senha'>Senha</label>
                                                    <br>
                                                    <button class="btn btn-info btn-fill pull-left" onclick="alterar_edicao()" type="submit" id="editarsenha">Editar Senha</button>
                                                    <div class='row' style="margin-left: 0; margin-right: 0;" id='rowSenha'>

                                                    <div class="none" id='pass'>
                                                        <div class='texto'>Senha antiga</div>
                                                        <p class='p-senha'>
                                                            <input type="password" id='senha_antiga' name='senha_antiga'>
                                                            <i class="gg-eye eye" id="togglePassword_antigo" style="margin-top: 5px !important;"></i>
                                                        </p>
                                                    </div>

                                                    <div class="none" id='pass2'>
                                                        <i class="bi bi-question-circle" style="margin-left: 87px !important;" id='passwordTip'></i>
                                                        <span id='passwordText'>Uma senha forte deve ter no mínimo 10 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.</span>
                                                        <div class='texto'>Senha nova</div>
                                                        <p class='p-senha'>
                                                            <input type="password" id='senha_nova' name='senha_nova'>
                                                            <i class="gg-eye eye" id="togglePassword_novo" style="margin-top: 5px !important;"></i>
                                                        </p>
                                                        <span id="StrengthDisp" class="badge displayBadge none">Validando senha...</span>
                                                    </div>
                                                    
                                                    <div class="none" id='pass3'>
                                                        <div class='texto'>Digite Novamente</div>
                                                        <p class='p-senha'>
                                                            <input type="password" id='senha_nova_dup' name='senha_nova_dup'>
                                                            <i class="gg-eye eye" id="togglePassword_novo_dup" style="margin-top: 5px !important;"></i>
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='none alerta' id='senha_antigaAlert'></div>
                                            <div class='none alerta' id='senha_novaAlert'></div>
                                            <div class='none alerta' id='senha_nova_dupAlert'></div>
                                        </div>
                        
                                        </div>
                                        <button class="btn btn-info btn-fill pull-right" id='salvarbtn' onclick="salvar(this)" disabled='true'>Salvar</button>
                                        <button class="btn btn-info btn-fill pull-right" id='cancelarbtn' onclick="cancelar(this)" disabled='true'>Cancelar</button>

                                        <button class="btn btn-info btn-fill pull-right none" id='salvar_senhabtn' onclick="salvar(this)">Salvar</button>
                                        <button class="btn btn-info btn-fill pull-right none" id='cancelar_senhabtn' onclick="cancelar(this)" style="color:#4E6EF1;background-color:white;border-color:#4E6EF1 !important;">Cancelar</button>
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
                                <a href="../Contato/contato" id='suporte' target="_blank">Suporte</a>
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
<script src="../assets/js/popup.js"></script>
<script src="../assets/js/jquery.passwordRequirements.min.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>
</html>
