<!DOCTYPE html>
<html>
	<?php
	session_start();
	error_reporting(E_ERROR | E_PARSE);
	if(!isset($_SESSION['cadastro']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
		header("Refresh:0; url=cadastro_empresa.php".'?'.md5('erro=true'));
        exit;
	}
	?>
	<head>
		<meta charset="utf-8">
		<title>Cadastro</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- LINEARICONS -->
		<link rel="stylesheet" href="fonts/linearicons/style.css">
		
		<!-- STYLE CSS -->
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/popup.css">
		<link rel="shortcut icon" href="../../assets/img/favicon/favicon.ico" type="image/x-icon">
		
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
				<form action="inser.php" method="POST" name="cadastro" onsubmit="return false" id="cadastro">
					<h3>Cadastro Empresa</h3>
					<div class="form-holder">
						<span class="lnr lnr-apartment"></span>
						<input type="text" class="form-control" placeholder="Nome da Empresa"  id='nome_empresa' name='nome_empresa'>
					</div>
					<div class="form-holder">
						<span class="lnr lnr-apartment"></span>
						<input type="text" class="form-control" placeholder="Nome Fantasia"  id="nome_fantasia" name="nome_fantasia">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-apartment"></span>
						<input type="text" class="form-control" placeholder="CNPJ"  id="cnpj" name="cnpj" onkeypress="$(this).mask('00.000.000/0000-00')">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-apartment"></span>

						<div class="col-md-4 selectContainer">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
							<select class="form-control selectpicker" onChange="selecionar2(this)" id="ramo" name="ramo"> 
							  <option value="ramo">Selecione o Ramo</option>
							  <option>Alimentação</option>
							  <option>Construção</option>
							  <option>Educação</option>
							  <option>Entretenimento</option>
							  <option>Saúde</option>
							  <option>Serviços Pessoais</option>
							  <option>Tecnologia</option>
							  <option>Vendas</option>
							  <option>Vestuário</option>
							</select>
						  </div>
						</div>
						

					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<input type="text" class="form-control" placeholder="CEP"  id="cep_empresa" name="cep_empresa" onkeypress="$(this).mask('00.000-000')">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<input type="text" class="form-control" placeholder="Rua"  id="rua_empresa" name="rua_empresa">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<input type="text" class="form-control" placeholder="Número"  id="numero_empresa" name="numero_empresa">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<input type="text" class="form-control" placeholder="Bairro"  id="bairro_empresa" name="bairro_empresa">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<input type="text" class="form-control" placeholder="Cidade"  id="cidade_empresa" name="cidade_empresa">
					</div>
					<div class="form-holder">
						<span class="lnr lnr-map-marker"></span>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
						
							<select class="form-control selectpicker" onChange="selecionar(this)" id="estado_empresa" name="estado_empresa">
							<option value="estado">Estado</option>
							<option value="AC">Acre</option>
							<option value="AL">Alagoas</option>
							<option value="AP">Amapá</option>
							<option value="AM">Amazonas</option>
							<option value="BA">Bahia</option>
							<option value="CE">Ceará</option>
							<option value="DF">Distrito Federal</option>
							<option value="ES">Espírito Santo</option>
							<option value="GO">Goiás</option>
							<option value="MA">Maranhão</option>
							<option value="MT">Mato Grosso</option>
							<option value="MS">Mato Grosso do Sul</option>
							<option value="MG">Minas Gerais</option>
							<option value="PA">Pará</option>
							<option value="PB">Paraíba</option>
							<option value="PR">Paraná</option>
							<option value="PE">Pernambuco</option>
							<option value="PI">Piauí</option>
							<option value="RJ">Rio de Janeiro</option>
							<option value="RN">Rio Grande do Norte</option>
							<option value="RS">Rio Grande do Sul</option>
							<option value="RO">Rondônia</option>
							<option value="RR">Roraima</option>
							<option value="SC">Santa Catarina</option>
							<option value="SP">São Paulo</option>
							<option value="SE">Sergipe</option>
							<option value="TO">Tocantins</option>
						</select>
					  </div>
					</div>
					<button class="btn btn-warning" type="submit" onclick="validar()" id='butao'>
						<span >Registrar</span>
					</button>
				</form>
				<img src="images/image-2.png" alt="" class="image-2">
			</div>
			
		</div>
		
		<script src="js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
		<script src="js/validar.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
	</body>
</html>