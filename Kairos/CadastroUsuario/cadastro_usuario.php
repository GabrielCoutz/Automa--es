<!DOCTYPE html>
<html>
<?php
	session_start();
	?>

<head>
    <meta charset="utf-8">
    <title>Cadastro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- LINEARICONS -->
    <link rel="stylesheet" href="assets/fonts/linearicons/style.css">

    <!-- STYLE CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/popup.css">
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

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
            <form action="assets/php/enviar_usuario" method="POST" class="gridado" name="cadastro"
                onsubmit="return false" id="cadastro">
                <h3>Cadastro</h3>

                <div class="form-holder">
                    <span class="lnr lnr-user"></span>
                    <input type="text" class="form-control" placeholder="Nome Completo" id='nome' name='nome' onkeyup="apenasLetras(this)" maxlength="50">
                </div>
                <div class='none alerta' id='nomeAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-phone-handset"></span>
                    <input type="tel" class="form-control" placeholder="Telefone" id="tel" name='tel'
                        onkeypress="$(this).mask('(00) 0000-00009')">
                </div>
                <div class='none alerta' id='telAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-envelope"></span>
                    <input type="email" class="form-control" placeholder="Email" id="email" name='email'>
                </div>
                <div class='none alerta' id='emailAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-user"></span>
                    <input type="tel" class="form-control" placeholder="CPF" id="cpf" name='cpf'
                        onkeypress="$(this).mask('000.000.000-00')">
                </div>
                <div class='none alerta' id='cpfAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-map-marker"></span>
                    <input type="tel" class="form-control" placeholder="CEP" id="cep" name='cep'
                        onkeypress="$(this).mask('00.000-000')" onkeyup="ler(this)">
                </div>
                <div class='none alerta' id='cepAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-map-marker"></span>
                    <input type="tel" class="form-control" placeholder="Número" id="numero" name='numero'>
                </div>
                <div class='none alerta' id='numeroAlert'></div>

                <div id='endereco'></div>


                <div class="form-holder none" id='form_rua'>
                    <span class="lnr lnr-map-marker"></span>
                    <input type="text" class="form-control" placeholder="Rua" id="rua" name='rua'>
                </div>
                <div class='none alerta' id='ruaAlert'></div>

                <div class="form-holder none" id='form_bairro'>
                    <span class="lnr lnr-map-marker"></span>
                    <input type="text" class="form-control" placeholder="Bairro" id="bairro" name='bairro'>
                </div>
                <div class='none alerta' id='bairroAlert'></div>

                <div class="form-holder none" id='form_cidade'>
                    <span class="lnr lnr-map-marker"></span>
                    <input type="text" class="form-control" placeholder="Cidade" id="cidade" name='cidade'>
                </div>
                <div class='none alerta' id='cidadeAlert'></div>

                <div class="form-holder none" id='form_estado'>
                    <span class="lnr lnr-map-marker"></span>
                    <div class="input-group">
                        <select class="form-control selectpicker none select" id="estado" name='estado'>
                            <option value disabled selected>Estado</option>
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
                <div class='none alerta' id='estadoAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-lock"></span>
                    <p>
                        <input type="password" class="form-control" placeholder="Senha" id="senha" name='senha'>
                        <i class="bi bi-eye-slash" id="togglePassword"></i>
                    </p>
                    <span id="StrengthDisp" class="badge displayBadge">Validando senha...</span>
                </div>
                <div class='none alerta' id='senhaAlert'></div>

                <div class="form-holder">
                    <span class="lnr lnr-lock"></span>
                    <p>
                        <input type="password" class="form-control" placeholder="Confirmar Senha" id="confirm_senha"
                            name='confirm_senha'>
                        <i class="bi bi-eye-slash" id="togglePassword_confirm"></i>
                    </p>
                </div>
                <div class='none alerta' id='confirm_senhaAlert'></div>

                <div class="g-recaptcha" data-sitekey="6Ld5L3oeAAAAAAH8CgndVZBek5uasbGl5mroKjP5" id="captcha"></div>
                <div class='none alerta' id='captchaAlert'></div>
                
                <div class='none alerta' id='butaoAlert'>Apenas CPF's válidos são aceitos, por favor verifique e tente novamente!</div>
                <button class="btn btn-warning" type="submit" onclick="validar()" id='butao' name='butao'>
                    <span>Registrar</span>
                </button>
                <div id='signin'>
                    <a href="../Login/login">Já possui conta? Então faça login</a>
                </div>
            </form>
            <img src="assets/images/image-2.png" alt="" class="image-2">
        </div>
    </div>
    <script src="assets/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'>
    </script>
    <script src="assets/js/validar.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>


</body>

</html>