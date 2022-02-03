<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- LINEARICONS -->
		<link rel="stylesheet" href="fonts/linearicons/style.css">
		
		<!-- STYLE CSS -->
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/popup.css">
		<link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
		<?php
			session_start();
			if(isset($_GET[md5('login=true')])){
				header('Location: ../Perfil/perfil.php');
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
		<div class="wrapper">
			<div class="inner">
				<form method="POST" id="cadastro" action="js/config.php?validar=true">
					<h3>Login</h3>
					<div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="text" class="form-control" placeholder="Email" id="email" name='email' >
					</div>
			
					<div class="form-holder">
						<span class="lnr lnr-lock"></span>
						<p>
							<input type="password" class="form-control" placeholder="Senha" id="senha" name='senha'>
							<i class="bi bi-eye-slash" id="togglePassword"></i>
						</p>
					</div>

					<button type='submit' id='butao' name="butao" onclick="validar()">
						<span>Entrar</span>
					</button>
					<div id='signup'>
						<a href="../Cadastro/cadastro.php">Não possui possui conta? Então cadastre-se</a>
					</div>
				</form>
				<img src="images/image-2.png" alt="" class="image-2">
			</div>
			
		</div>
		
		<script src="js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
		<script src="js/validar.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
	</body>
</html>