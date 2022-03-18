<!doctype html>
<html lang="pt-BR">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap" rel="stylesheet">
  
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    
    <!-- Style -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/popup.css">

    <title>Contato</title>

    <?php
    session_start();
    error_reporting(E_ERROR | E_PARSE);


    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';
    
    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    if(isset($_SESSION['email'])){
      $cpf = $_SESSION['cpf'];
    

      $nome = $select=mysqli_query($conec, "SELECT nome FROM usuario WHERE cpf = '$cpf'")->fetch_assoc()['nome'];

      $email = $_SESSION['email'];
    }
    ?>
  </head>
  <body>
  

  <div class="content">
    
    <div class="container caixa">
      <div class="row justify-content-center">
        <div class="col-md-10">
          

          <div class="row justify-content-center">
            <div class="col-md-6">
              
              <h3 class="heading mb-4">No que podemos ajudar?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?</p>

              <p><img src="assets/images/imagem.png" alt="Image" class="img-fluid"></p>

            </div>
            <div class="col-md-6">
              
              <form class="mb-5" action="assets/php/enviar" method="POST" id="formContato" onsubmit="return false">
                <div class="row">
                  <div class='none' id='nomeSalvo'>
                    <a><?= $nome; ?></a>
                  </div>
                  <div class="col-md-12 form-group">
                    <input type="text" class="form-control" name="nome" id="nome" placeholder="Nome">
                  </div>
                </div>
                <div class="row">
                  <div class='none' id='emailSalvo'>
                    <a><?= $email; ?></a>
                  </div>
                  <div class="col-md-12 form-group">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Email">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <input type="text" class="form-control" name="assunto" id="assunto" placeholder="Assunto">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <textarea class="form-control" name="mensagem" id="mensagem" cols="30" rows="7" placeholder="Escreva sua mensagem"></textarea>
                  </div>
                </div>  
                <div class="row">
                  <div class="col-12">
                    <button class="btn btn-primary rounded-0 py-2 px-4" onclick="validar()">
                      enviar
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
  <script src="assets/js/script.js"></script>

  </body>
</html>