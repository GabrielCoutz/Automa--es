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
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon"/>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>

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
  

  <div class="content">
    
    <div class="container caixa">
      <div class="row justify-content-center">
        <div class="col-md-10">
          

          <div class="row justify-content-center">
            <div class="col-md-6">
              
              <h3 class="heading mb-4">Como podemos ajudar?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?</p>

              <p><img src="assets/images/imagem.png" alt="Image" class="img-fluid"></p>

            </div>
            <div class="col-md-6">
              
                <div class="row">
                  <div class="col-md-12 form-group text-center" id='email'>
                  kairozprojeto@gmail.com <i title='Copiar'class='fa fa-copy' id='copiar' onclick='copiaremail()'></i>
                  <div class='none' id='mensagem'>Email Copiado!</div>
                  </div>
                  <input type="text" class='none' value='kairozprojeto@gmail.com' id='texto'>
                  
                  
                </div>
                <div class="row">
                  <div class="col-12">
                    <button class="btn btn-primary rounded-0 py-2 px-4" onclick=""><div class='circle'></div>
                      Enviar
                    </button>
                  </div>
                </div>

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