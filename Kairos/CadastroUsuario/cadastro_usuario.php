<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cadastro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/popup.css">
    <link rel="stylesheet" href="../assets/css/icones.css">
    <link rel="stylesheet" href="../assets/css/jquery.passwordRequirements.css">
    <link rel="shortcut icon" href="../assets/img/favicon/favicon.ico" type="image/x-icon">
    <?php
	    session_start();
	?>
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
                <h3 style="font-family: 'San Francisco' !important;">Cadastro</h3>

                <div class="form-holder">
                    <i class="gg-user user"></i>
                    <div class="input-content">
                        <div class='inputbox'>
                            <div class='inputbox-content'>
                                <div class="label-float">
                                    <input type="text" class="form-control" placeholder="Nome Completo" id='nome' name='nome' onkeyup="apenasLetras(this)" maxlength="100">
                                    <label>Nome Completo</label>
                                    <span class="underline" style="padding-right: 0px !important;" id='nomeunderline'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='none alerta' id='nomeAlert'></div>

                <div class="form-holder">
                    <i class="gg-smartphone phone"></i>
                    <div class="input-content">
                        <div class='inputbox'>
                            <div class='inputbox-content'>
                                <div class="label-float">
                                    <input type="tel" class="form-control" placeholder="Telefone" id="tel" name='tel' onkeypress="$(this).mask('(00) 0000-00009')" maxlength="15">
                                    <label>Telefone</label>
                                    <span class="underline" style="padding-right: 0px !important;" id='telunderline'></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class='none alerta' id='telAlert'></div>

                <div class="form-holder">
                    <i class="gg-mail mail"></i>
                    <div class="input-content">
                        <div class='inputbox'>
                            <div class='inputbox-content'>
                                <div class="label-float">
                                    <input type="email" class="form-control" placeholder="Email" id="email" name='email' maxlength="50">
                                    <label>Email</label>
                                    <span class="underline" style="padding-right: 0px !important;" id='emailunderline'></span>
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
                                    <input type="password" class="form-control pr-password" placeholder="Senha" id="senha" name='senha'>
                                    <label>Senha</label>
                                    <i class="gg-eye eye" id="togglePassword"></i>
                                    <span class="underline" style="padding-right: 0px !important;" id='senhaunderline'></span>
                                </div>
                                </div>
                            </div>
                        </div>

                    <span id="StrengthDisp" class="badge displayBadge">Validando senha...</span>
                </div>
                <div class='none alerta' id='senhaAlert'></div>

                <div class="form-holder">
                    <i class="gg-lock lock"></i>
                        <div class="input-content">
                            <div class='inputbox'>
                                <div class='inputbox-content'>
                                <div class="label-float">
                                    <input type="password" class="form-control" placeholder="Confirmar Senha" id="confirm_senha" name='confirm_senha'>
                                    <label>Confirmar Senha</label>
                                    <i class="gg-eye eye" id="togglePassword_confirm"></i>
                                    <span class="underline" style="padding-right: 0px !important;" id='confirm_senhaunderline'></span>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class='none alerta' id='confirm_senhaAlert'></div>

                <div class="g-recaptcha" data-sitekey="6Ld5L3oeAAAAAAH8CgndVZBek5uasbGl5mroKjP5" id="captcha"></div>
                <div class='none alerta' id='captchaAlert'></div>
                
                <button class="btn btn-warning" type="submit" onclick="validar()" id='butao' name='butao' style="font-family: 'San Francisco' !important;">
                    <span>Registrar</span>
                </button>
                <div id='signin'>
                    <a href="../Login/login" >Fazer login</a>
                </div>
            </form>
            <img src="assets/images/image-2.png" alt="" class="image-2">
        </div>
    </div>
    <script src="assets/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
    <script src="https://cdn.lordicon.com/lusqsztk.js"></script>
    <script src="../assets/js/popup.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="../assets/js/jquery.passwordRequirements.min.js"></script>
    <script src="assets/js/validar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
</body>
</html>