<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <title>Perfil</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../Cadastro/fonts/linearicons/style.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/popup.css">
  <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
  <?php
      session_start();


    $dbHost = 'sql210.epizy.com';
    $dbUname = 'epiz_30663895';
    $dbPass = 'ndLdcOqYk0K';
    $dbName = 'epiz_30663895_Banco_Kairos';
      error_reporting(E_ERROR | E_PARSE);
      

      if(!isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
        header("Refresh:0; url=perfil.php".'?'.md5('erro=true'));
        exit;
      } else {
        $email=$_SESSION['email'];
      }

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

      $select_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE cpf_usuario = '$cpf'");
      $result_empresa=$select_empresa->fetch_assoc();

      $_SESSION['nome_empresa_padrao']=$result_empresa['nome'];
      $_SESSION['nome_fantasia_padrao']=$result_empresa['nome_fantasia'];

      $id_empresa=$result_empresa['id'];
      $cnpj_empresa=$result_empresa['cnpj'];
      $_SESSION['cnpj_padrao']=$result_empresa['cnpj'];
      $_SESSION['ramo_padrao']=$result_empresa['ramo'];

      $select_empresa_endereco=mysqli_query($conec, "SELECT * FROM endereco_empresa WHERE cnpj_empresa = '$cnpj_empresa'");
      $result_empresa_endereco=$select_empresa_endereco->fetch_assoc();

      $select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE cpf_usuario = '$cpf'");
      $result_cartao=$select_cartao->fetch_assoc();

  ?>
</head>
<body style="background-image: url('css/wave.svg'); background-repeat: no-repeat;background-attachment: fixed;
  background-size: cover;">
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
  <div class="container">
    <div class="main-body">
          <div class="row center2">
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <div class="mt-3">
                      <h4><a><?= ucwords($result['nome']) ?></a></h4>
                        <p class="text-muted font-size-sm"><a><?= ucwords($result_endereco['bairro']) ?>, <?= ucwords($result_endereco['cidade']) ?>, <?= $result_endereco['estado'] ?></a></p>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item d-flex  align-items-center flex-wrap" id='teste'>
                            <span class="lnr lnr-diamond" id ='diamante'></span>Plano
                            <span class="text-secondary" id='plano'><a></a><?= ucwords($result_cartao['assinatura']) ?></a></span>
                          </li>
                        </ul>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">CPF</h6>
                    </div>
                    <form action="verificar_dados.php" method="POST" id='dados_usuario' onsubmit="return false">
                        <div class="col-sm-9 text-secondary" maxlength="14" type="text" id='cpf'>
                          <a><?= $result['cpf'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Email</h6>
                        </div>
                        <input class='none'type="email" id='email_input' name='email_input'>
                        <div class="col-sm-9 text-secondary" id='email'>
                        <a id='aemail'><?= $result['email'] ?></a>
                        </div>
                      </div>
                      
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Telefone</h6>
                        </div>
                        <div class="phone-list none">
                          <div class="input-group phone-input">
                            <button type="button" class="btn btn-success btn-sm btn-add-phone none" id='add_tel'><div class='circle'></div>Adicionar telefone</button>
                            <button type="button" class="btn btn-sm btn-del-phone none" id='del_tel'><div class='circle'></div>Excluir telefone</button>
                          </div>
                        </div>
                        
                        <div class="col-sm-9 text-secondary" id='tel'>
                          <a><?= $result_telefone['tel']?></a>
                          <a><?= '<br>'.$teste ?></a>
                        </div>
                      </div>

                      <hr>

                      <div class="row" id='senha'>
                        <div class="col-sm-3">
                          <h6 class="mb-0 senha">Senha</h6>
                        </div>
                        <button class="btn" onclick="editar_senha()" type="submit" id="editarsenha"><div class='circle'></div>Editar Senha</button>
                        <div class='row' style="margin-left: 0; margin-right: 0;">
                          <div class="none" id='pass'>
                            <div class='texto'>Senha antiga</div>
                            <p>
                              <input type="password" id='senha_antiga' name='senha_antiga_input' onchange="vazio_senha()">
                              <i class="bi bi-eye-slash" id="togglePassword_antigo"></i>
                            </p>
                            
                            <br>
                          </div>
                          
                          <div class="none" id='pass2'>
                            <div class='texto'>Senha nova</div>
                              <p>
                                <input type="password" id='senha_nova' name='senha_nova_input' onchange="vazio_senha()">
                                <i class="bi bi-eye-slash" id="togglePassword_novo"></i>
                              </p>
                            <br>
                          </div>
                          
                          <div class="none" id='pass3'>
                            <div class='texto'>Digite Novamente</div>
                            <p>
                              <input type="password" id='senha_nova_dup' name='senha_nova_dup_input' onchange="vazio_senha()">
                              <i class="bi bi-eye-slash" id="togglePassword_novo_dup"></i>
                            </p>
                            <br>
                          </div>
                        </div>
                        
                      </div>
                      <hr>
                      
                      <div class="row">
                        <div class="col-sm-12">
                          <button class="btn button b4" id='editar' onclick="editar_usuario()" type="submit"><div class='circle'></div> Editar</button>
                          <button class="btn salvar none" id='salvar' type="submit" onclick="salvar_usuario()"><div class='circle'></div>Salvar</button>
                          <button class="btn cancelar none" onclick="cancelar_usuario()" id='cancelar'><div class='circle'></div>Cancelar</button>
                          
                          <button class="btn salvar none" id='salvar_senhabtn' type="submit" onclick="salvar_senha()"><div class='circle'></div>Salvar senha</button>
                          <button class="btn cancelar none" onclick="cancelar_senha()" id='cancelar_senhabtn'><div class='circle'></div>Cancelar alteração</button>
                        </div>
                  </div>
                </div>
              </div>
              </form>
                <div class="card mb-3">
                  <h4 id="cad_empresa">Dados da Empresa</h4>
                  <hr>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Nome da Empresa</h6>
                      </div>
                      <form action="verificar_dados.php" method="POST" id='dados_empresa' onsubmit="return false">
                        <input class='none'type="text" id='nome_empresa_input' name='nome_empresa_input'>
                        <div class="col-sm-9 text-secondary" id='nome_empresa'>
                        <a><?= $result_empresa['nome'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Nome Fantasia</h6>
                        </div>
                        <input class='none'type="text" id='nome_fantasia_input' name='nome_fantasia_input'>
                        <div class="col-sm-9 text-secondary" id='nome_fantasia'>
                        <a><?= $result_empresa['nome_fantasia'] ?></a>
                        </div>
                      </div>
                      
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">CNPJ</h6>
                        </div>
                        <div class="col-sm-9 text-secondary" id='cnpj'>
                        <a><?= ucwords($result_empresa['cnpj']) ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Ramo</h6>
                        </div>
                          <select class="form-control selectpicker select none" id="ramo_input" name="ramo_input"> 
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
                        <div class="col-sm-9 text-secondary" id='ramo'>
                        <a><?= ucwords($result_empresa['ramo']) ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">CEP</h6>
                        </div>
                        <input class='none'type="tel" id='cep_empresa_input' name='cep_empresa_input' onkeypress="$(this).mask('00.000-000')" onchange="vazio_empresa()">
                        <div class="col-sm-9 text-secondary" id='cep_empresa'>
                        <a><?= $result_empresa_endereco['cep'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Rua</h6>
                        </div>
                        <input class='none'type="text" id='rua_empresa_input' name='rua_empresa_input'>
                        <div class="col-sm-9 text-secondary" id='rua_empresa'>
                        <a id='arua'><?= $result_empresa_endereco['rua'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Número</h6>
                        </div>
                        <input class='none'type="tel" id='numero_empresa_input' name='numero_empresa_input' onchange="vazio_empresa()">
                        <div class="col-sm-9 text-secondary" id='numero_empresa'>
                        <a><?= $result_empresa_endereco['numero'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Bairro</h6>
                        </div>
                        <input class='none'type="text" id='bairro_input' name='bairro_empresa_input'>
                        <div class="col-sm-9 text-secondary" id='bairro_empresa'>
                        <a><?= $result_empresa_endereco['bairro'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Cidade</h6>
                        </div>
                        <input class='none'type="text" id='cidade_input' name='cidade_empresa_input'>
                        <div class="col-sm-9 text-secondary" id='cidade_empresa'>
                        <a><?= $result_empresa_endereco['cidade'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Estado</h6>
                        </div>
                        <div class="col-sm-9 text-secondary" id='estado_empresa' name='estado_empresa_input'>
                        <a><?= $result_empresa_endereco['estado'] ?></a>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm-12">
                        <button class="btn " onclick="editar_empresa()" id='editar_empresabtn'><div class='circle'></div>Editar</button>
                          <button class="btn salvar none" onclick="salvar_empresa()" id='salvar_empresabtn'><div class='circle'></div>Salvar</button>
                          <button class="btn cancelar none" onclick="cancelar_empresa()" id='cancelar_empresabtn'><div class='circle'></div>Cancelar</button>
                          <button class="butao" onclick="sair()" id='sairbtn'><div class='circle'></div>Sair</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              <div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                </div>
                <div class="col-sm-6 mb-3">
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
    <script src="script.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
</body>
</html>