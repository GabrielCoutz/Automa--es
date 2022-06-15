<!DOCTYPE html>
<html>
	<?php
	session_start();
	error_reporting(E_ERROR | E_PARSE);


	if(!isset($_SESSION['cadastro']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
		header("Refresh:0; //url=cadastro_empresa".'?'.md5('erro=true'));
        exit;
	}
	?>
	<head>
		<meta charset="utf-8">
		<title>Cadastro</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="assets/fonts/linearicons/style.css">
		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="../assets/css/popup.css">
		<link rel="stylesheet" href="../assets/css/icones.css">
		<link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">

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
				<form action="assets/php/enviar_empresa" method="POST" name="cadastro" onsubmit="return false" id="cadastro_empresa">
					<h3 style="font-family: 'Muli-Regular' !important;">Cadastro Empresarial</h3>
					<div class="form-holder">
						<i class="gg-organisation organisation"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="text" class="form-control" placeholder="Nome da Empresa"  id='nome_empresa' name='nome_empresa' maxlength="50">
										<label>Nome da Empresa</label>
										<span class="underline" style="padding-right: 0px !important;" id='nome_empresaunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='nome_empresaAlert'></div>

					<div class="form-holder">
						<i class="gg-organisation organisation"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="text" class="form-control" placeholder="Nome Fantasia"  id="nome_fantasia" name="nome_fantasia" maxlength="50">
										<label>Nome Fantasia</label>
										<span class="underline" style="padding-right: 0px !important;" id='nome_fantasiaunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='nome_fantasiaAlert'></div>

					<div class="form-holder">
						<i class="gg-organisation organisation"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="tel" class="form-control" placeholder="CNPJ"  id="cnpj" name="cnpj" onkeypress="$(this).mask('00.000.000/0000-00')">
										<label>CNPJ</label>
										<span class="underline" style="padding-right: 0px !important;" id='cnpjunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='cnpjAlert'></div>

					<div class="form-holder">
						<i class="gg-organisation organisation"></i>
						<div class="col-md-4 selectContainer">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
							<select class="form-control selectpicker" id="ramo" name="ramo"> 
							  <option value disabled selected>Selecione o Ramo</option>
							  <option>Alimentação</option>
							  <option>Saúde</option>
							  <option>Serviços</option>
							  <option>Tecnologia</option>
							  <option>Moda</option>
							</select>
						  </div>
						</div>
					</div>
					<div class='none alerta' id='ramoAlert'></div>

					<div class="form-holder">
						<i class="gg-pin pin"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="tel" class="form-control" placeholder="CEP"  id="cep_empresa" name="cep_empresa" onkeypress="$(this).mask('00.000-000')" onkeyup="ler(this)">
										<label>CEP</label>
										<span class="underline" style="padding-right: 0px !important;" id='cep_empresaunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='cep_empresaAlert'></div>

					<div class="form-holder">
						<i class="gg-pin pin"></i>
						<div class="input-content">
							<div class='inputbox'>
								<div class='inputbox-content'>
									<div class="label-float">
										<input type="tel" class="form-control" placeholder="Número"  id="numero_empresa" name="numero_empresa" maxlength="15">
										<label>Número</label>
										<span class="underline" style="padding-right: 0px !important;" id='numero_empresaunderline'></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='none alerta' id='numero_empresaAlert'></div>

					<div id='endereco'></div>
					<input type="text" class="none" id="rua_empresa" name="rua_empresa">
					<input type="text" class="none"  id="bairro_empresa" name="bairro_empresa">
					<input type="text" class="none"  id="cidade_empresa" name="cidade_empresa">
					<input type="text" class="none"  id="estado_empresa" name="estado_empresa">

					<div class='none alerta' id='butaoAlert'>Apenas CNPJ's válidos são aceitos, por favor verifique e tente novamente!</div>
					<button class="btn btn-warning" type="submit" onclick="validar()" id='butao' style="font-family: 'Muli-Regular' !important;">
						<span id='reg'>Registrar</span>
					</button>
				</form>
				<img src="assets/images/image-2.png" alt="" class="image-2">
			</div>
		
		</div>
		

		<script src="assets/js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
		<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
		<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
		<script src="../assets/js/popup.js"></script>
		<script src="assets/js/validar.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
	</body>
</html>