<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="utf-8">
		<title>Recuperação</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link rel="stylesheet" href="assets/fonts/linearicons/style.css">
		<link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/style.scss">
		<link rel="stylesheet" href="../../assets/css/popup.css">
		<link rel="stylesheet" href="../../assets/css/icones.css">
		<link rel="shortcut icon" href="../../assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="../../assets/css/jquery.passwordRequirements.css">
		<?php
			session_start();
			error_reporting(E_ERROR | E_PARSE);
			if(isset($_GET[md5('sucesso=true')])){
				header('Location: ../Login/login');
			}
			if (!isset($_SESSION['mudar']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
				header("Refresh:0; url=mudar".'?'.md5('erro=true'));
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
		<button id='voltar' onclick="paginaInicial()"><i class="gg-home-alt home"></i><span id='textoHome'>Página Inicial</span></button>
		<div class="wrapper">
			<div class="inner">
				<form method="POST" id="mudar" action="assets/php/config" style="padding: 72px 48px 72px;" >
					<h3 style="font-family: 'Muli-Regular' !important;">Mudança de senha</h3>
                <div class="form-holder">
                    <i class="gg-lock lock"></i>
                    <p>
					<div class="input-content">
						<div class='inputbox'>
							<div class='inputbox-content'>
								<div class='label-float'>
									<input type="password" class="form-control pr-password" placeholder="Nova Senha" id="senha_nova" name='senha_nova'>
									<label>Nova Senha</label>
									<i class="gg-eye eye" id="togglePassword"></i>
									<span class='underline' id='senha_novaunderline'></span>
								</div>
							</div>
						</div>
					</div>
                    </p>
                    <span id="StrengthDisp" class="badge displayBadge">Validando senha...</span>
                </div>

                <div class="form-holder">
                    <i class="gg-lock lock"></i>
                    <p>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class='label-float'>
										<input type="password" class="form-control" placeholder="Digite Novamente" id="senha_nova_dup" name='senha_nova_dup'>
										<label>Digite Novamente</label>
										<i class="gg-eye eye" id="togglePassword_dup"></i>
										<span class='underline' id='senha_nova_dupunderline'></span>
									</div>
								</div>
							</div>
						</div>
                    </p>
                </div>
                <div class='none alerta' id='senha_novaAlert'></div>

					<button type='submit' class="btn btn-warning" id='butao' name="butao" onclick="validar()" style="font-family: 'Muli-Regular' !important;">
						<span>Entrar</span>
					</button>
					<div id='divAjuda'>
						<a href="../../Contato/contato" id='ajuda' target="_blank">Precisa de ajuda?</a>
					</div>
					
					
				</form>
				<img src="assets/images/image-2.png" class="image-2">
			</div>
		</div>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
		<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
		<script src="../../assets/js/popup.js"></script>
		<script src="../../assets/js/jquery.passwordRequirements.min.js"></script>
		<script src="assets/js/script.js"></script>
	</body>
</html>