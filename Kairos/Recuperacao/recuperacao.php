<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Recuperação</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- LINEARICONS -->
		<link rel="stylesheet" href="assets/fonts/linearicons/style.css">
		<!-- STYLE CSS -->
		<link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/style.scss">
		<link rel="stylesheet" href="../assets/css/popup.css">
		<link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		<?php
			error_reporting(E_ERROR | E_PARSE);
			if(isset($_GET[md5('sucesso=true')])){
				header('Location: MudarSenha/mudar?'.md5('conta_encontrada=true'));
				exit;
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
				<form method="POST" id="recuperacao" action="assets/php/config">
					<h3>Verificação de Identidade</h3>
					<hr>
					<p id='texto'>
						Não tem problema se esqueceu a senha da sua conta, para recuperá-la basta inserir os dados da mesma nos campos abaixo.
					</p>
					<hr>
					
                    <div class="form-holder">
						<span class="lnr lnr-user"></span>
						<p>
							<input type="text" class="form-control" placeholder="Nome Completo" id="nome" name='nome' maxlength="100" onkeyup="apenasLetras(this)">
						</p>
					</div>
					<div class='none alerta' id='nomeAlert'></div>

					<div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="email" class="form-control" placeholder="Email" id="email" name='email' maxlength="50">
					</div>
					<div class='none alerta' id='emailAlert'></div>

					<div class="form-holder">
						<span class="lnr lnr-user"></span>
						<p>
							<input type="tel" class="form-control" placeholder="CPF" id="cpf" name='cpf' onkeypress="$(this).mask('000.000.000-00')">
						</p>
					</div>
					<div class='none alerta' id='cpfAlert'></div>

					<div class="g-recaptcha" data-sitekey="6Ld5L3oeAAAAAAH8CgndVZBek5uasbGl5mroKjP5" id="captcha"></div>
                	<div class='none alerta' id='captchaAlert'></div>

					<button type='submit' class="btn btn-warning" id='butao' name="butao" onclick="validar()">
						<span>Entrar</span>
					</button>
					<div id='divAjuda'>
						<a href="../Contato/contato" id='ajuda' target="_blank">Precisa de ajuda?</a>
					</div>
					
					
				</form>
				<img src="assets/images/image-2.png" class="image-2">
			</div>
		</div>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
		<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
		<script src="../assets/js/popup.js"></script>
		<script src="assets/js/script.js"></script>
	</body>
</html>