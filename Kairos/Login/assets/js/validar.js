window.onload = function () {
    window.setTimeout(fadeout, 500);
    //abrirJanelaMarketing()
}


function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}
function nada(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        document.getElementById("login").submit();
    })
    document.getElementById('asdf_cancelar').click()
}
const limpar_inputs = function(){
    let elementos = document.getElementsByTagName('input')
    for(let i = 0; i < elementos.length ; i++){
        elementos[i].classList.remove('vermei')
    }

    limpar_alertas()
}

const limpar_alertas = function(){
    let alerta = document.getElementsByClassName('alerta')
    let underline = document.getElementsByClassName('underline')

    for(let i = 0; i < alerta.length ; i++){
        if (!alerta[i].classList.contains('none')){
            alerta[i].classList.toggle('none')
        }
    }

    for(let i = 0; i < underline.length ; i++){
        if (underline[i].style.background == 'rgb(255, 0, 0)'){
            underline[i].style.background = '#4e6ef1a6'
        }
    }
}

function mudar_senha(botao,elemento){
    let togglePassword = document.querySelector('#'+botao);
    let password = document.querySelector('#'+elemento);
    togglePassword.addEventListener('click', function (e) {
        let type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('gg-eye')
        this.classList.toggle('gg-eye-alt');
    });
}
mudar_senha('togglePassword','senha')

function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

switch (true) {
    case window.location.href.includes(md5('login=false')):
        abrirjanela('red','Credenciais incorretas!<br>Por favor, verifique os dados inseridos!', 'Falha no login','falha')
        limparURL(md5('login=false'))
        document.getElementById("email").classList.add('vermei')
        document.getElementById("senha").classList.add('vermei')
        break;

    case window.location.href.includes(md5('sucesso=true')):
        abrirjanela('green','Dados cadastrados com sucesso!', 'Cadastro', 'sucesso')
        limparURL(md5('sucesso=true'))
        break;

    case window.location.href.includes(md5('sucesso_senha=true')):
        abrirjanela('green','Senha alterada com sucesso!', 'Recupera????o de Conta', 'sucesso')
        limparURL(md5('sucesso_senha=true'))
        break;

    case window.location.href.includes(md5('sucesso=false')):
        abrirjanela('red','N??o foi poss??vel realizar a opera????o solicitada. Por favor, tente novamente ou entre em contato conosco.', 'Erro inesperado', 'falha')
        limparURL(md5('sucesso=false'))
        break;
}

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento).classList.add('vermei')
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
    document.getElementById(elemento+'underline').style.background = '#ff0000'
}

$(document).keypress( // desativa tecla ENTER
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function apagarCookie(nome){
    document.cookie = nome+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
apagarCookie(md5('analise'))

function validar(){
    limpar_inputs()
    let email = document.getElementById("email")
    let senha = document.getElementById("senha")

    $("#login").submit(function(e) {
        e.preventDefault();
    });

    if (email.value == "" ||  !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email.value)){
        alertaDeErro(email.id, "Insira um email v??lido!")
        email.focus()

    } else if (senha.value == ""){
        alertaDeErro(senha.id, "Preencha a senha!")
        senha.focus()

    } else{
        localStorage.clear();
        abrirjanela('blue','Aguarde','Validando dados','carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
    }
}

function registrar(){
    window.location.href = "../CadastroUsuario/cadastro_usuario";
}

function paginaInicial(){
    window.location.href = "../index";
}