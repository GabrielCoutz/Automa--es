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
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/popup.css">
  <?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$email=$_SESSION['email'];


$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

$select=mysqli_query($conec, "SELECT * FROM usuario WHERE email = '$email'");
$result=$select->fetch_assoc();

$id=$result['id'];
$cpf=$result['cpf'];

$select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE id_usuario = '$id'");
$result_endereco=$select_endereco->fetch_assoc();

$select_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE id_usuario = '$id'");
$result_empresa=$select_empresa->fetch_assoc();

$id_empresa=$result_empresa['id'];

$select_empresa_endereco=mysqli_query($conec, "SELECT * FROM endereco_empresa WHERE id_empresa = '$id_empresa'");
$result_empresa_endereco=$select_empresa_endereco->fetch_assoc();

$select_cartao=mysqli_query($conec, "SELECT * FROM cartao WHERE cpf_usuario = '$cpf'");
$result_cartao=$select_cartao->fetch_assoc();



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
                    <div class="col-sm-9 text-secondary">
                      <a><?= $result['cpf'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result['email'] ?></a>
                    </div>
                  </div>
                  
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Telefone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result['telefone'] ?></a>
                    </div>
                  </div>
                  
                  <hr>
                  <div class="row">
                    <div class="col-sm-12">
                      <a class="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-3">
                <h4 id="cad_empresa">Dados da Empresa</h4>
                <hr>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nome da Empresa</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa['nome'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nome Fantasia</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa['nome_fantasia'] ?></a>
                    </div>
                  </div>
                  
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">CNPJ</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= ucwords($result_empresa['cnpj']) ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Ramo</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= ucwords($result_empresa['ramo']) ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">CEP</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['cep'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Rua</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['rua'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Número</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['numero'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Bairro</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['bairro'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Cidade</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['cidade'] ?></a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Estado</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    <a><?= $result_empresa_endereco['estado'] ?></a>
                    </div>
                  </div>
                  <hr>
                  
                  <div class="row">
                    <div class="col-sm-12">
                      <a class="btn btn-info "href="#">Edit</a>
                      <a class="butao "href="../index.php">Sair</a>
                    </div>
                  </div>
                </div>
              </div>
            

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
    <script src="script.js"></script>
</body>
</html>