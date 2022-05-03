<!doctype html>
<html lang="pt-BR">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
  
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    
    <!-- Style -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon"/>

    <title>Contato</title>

    <?php
    session_start();
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
              
              <h3 class="heading mb-4">Estamos sempre à disposição</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?</p>

              <p><img src="assets/images/imagem.png" alt="Image" class="img-fluid"></p>

            </div>
            <div class="col-md-6" id='itens'>
              
                <div class="row">
                  <div class="col-md-12 form-group text-center">
                  <h6>Email de contato</h6> kairozprojeto@gmail.com</div>

                  <div class="col-12">
                    <button class="btn btn-primary rounded-0 py-2 px-4" onclick="voltar()"><div class='circle'></div>
                      <div id="texto">Voltar à Página Inicial</div>
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