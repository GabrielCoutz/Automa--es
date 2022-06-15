<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="utf-8">
		<title>Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="../assets/css/popup.css">
		<link rel="stylesheet" href="../assets/css/icones.css">
		<link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">

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
	<button id='voltar' onclick="paginaInicial()"><i class="gg-home-alt home"></i><span id='textoHome'>Página Inicial</span></button>
	<div class="wrapper">
			<div class="inner">
				<form method="POST" id="login" action="assets/php/config?validar=true" style="padding: 72px 48px 72px;" onsubmit="return false">
					<h3 style="font-family: 'San Francisco' !important;">Login</h3>
					<div class="form-holder">
						<i class="gg-user user"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="email" class="form-control" placeholder="Email" id="email" name='email' maxlength="50">
										<label>Email</label>
										<span class="underline" id='emailunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='emailAlert'></div>

					<div class="form-holder">
						<i class="gg-lock lock"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="password" class="form-control" placeholder="Senha" id="senha" name='senha'>
										<label>Senha</label>
										<i class="gg-eye eye" id="togglePassword"></i>
										<span class="underline" id='senhaunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='senhaAlert'></div>

					<button type='submit' class="btn btn-warning login" name="butao" onclick="validar()" style="font-family: 'San Francisco' !important;">
						<span>Entrar</span>
					</button>

					<button class="registrar" type="button" onclick="registrar()" id='butao' style="font-family: 'San Francisco' !important;">
						<span>Registrar-se</span>
					</button>
					<div id="esqueci">
						<a href="../Recuperacao/recuperacao">Esqueci a senha</a>
					</div>
					
				</form>
				<img src="assets/images/image-2.png" alt="" class="image-2">
			</div>
		</div>
		<script src="assets/js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
		<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
		<script src="../assets/js/popup.js"></script>
		<script src="assets/js/validar.js"></script>
	</body>
</html>