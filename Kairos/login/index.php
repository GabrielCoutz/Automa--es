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
		<?php
			session_start();
			if(isset($_GET[md5('login=false')])){
				echo '<script> alert("Falha no Login! Por favor, verifique suas credenciais e tente novamente.") </script>';
			} else if (isset($_GET[md5('login=true')])){
				header('Location: ../Perfil/perfil.html');
			}
		?>
	</head>

	<body>
		<div class="wrapper">
			<div class="inner">
				<form method="POST" id="cadastro" action="js/config.php?validar=true">
					<h3>Login</h3>
					<div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="text" class="form-control" placeholder="Nome de Usuário" id="email" name='email' >
					</div>
			
					<div class="form-holder">
						<span class="lnr lnr-lock"></span>
						<input type="password" class="form-control" placeholder="Senha" id="senha" name='senha'>
					</div>

					<button type='submit' id='butao' name="butao" onclick="validar()">
						<span>Entrar</span>
					</button>
				</form>
				<img src="images/image-2.png" alt="" class="image-2">
			</div>
			
		</div>
		
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/main.js"></script>
		<script src="js/validar.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
	</body>
</html>