<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- LINEARICONS -->
		<link rel="stylesheet" href="assets/fonts/linearicons/style.css">
		<!-- STYLE CSS -->
		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="assets/css/popup.css">
		<link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
		<?php
			error_reporting(E_ERROR | E_PARSE);
			if(isset($_GET[md5('login=true')])){
				header('Location: ../Perfil/usuario');
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
				<form method="POST" id="login" action="assets/php/config?validar=true">
					<h3>Login</h3>
					<div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="email" class="form-control" placeholder="Email" id="email" name='email' maxlength="50">
					</div>
					<div class='none alerta' id='emailAlert'></div>

					<div class="form-holder">
						<span class="lnr lnr-lock"></span>
						<p>
							<input type="password" class="form-control" placeholder="Senha" id="senha" name='senha'>
							<i class="bi bi-eye-slash" id="togglePassword"></i>
						</p>
					</div>
					<div class='none alerta' id='senhaAlert'></div>

					<button type='submit' class="btn btn-warning" id='butao' name="butao" onclick="validar()">
						<span>Entrar</span>
					</button>
					<div id='divAjuda'>
						<a href="../Contato/contato" id='ajuda'>Precisa de ajuda?</a>
					</div>
					
						
					
					<div id='signup'>
						<a href="../CadastroUsuario/cadastro_usuario">Não possui possui conta? Então cadastre-se</a>
					</div>
					
				</form>
				<img src="assets/images/image-2.png" alt="" class="image-2">
			</div>
		</div>
		<script src="assets/js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
		<script src="assets/js/validar.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
	</body>
</html>