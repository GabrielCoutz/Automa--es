window.onload = function () {
    window.setTimeout(fadeout, 500);
}
function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
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
    for(let i = 0; i < alerta.length ; i++){
        if (!alerta[i].classList.contains('none')){
            alerta[i].classList.toggle('none')
        }
    }
}
function nada(){
    document.getElementById('asdf_cancelar').click()
}

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const captcha = document.getElementById('captcha')

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
}

if (window.location.href.includes(md5('erro=true'))){ //erro no captcha
    abrirjanela('red','Possível Fraude detectada!<br>Por favor, insira as informações novamente.','Erro no CAPTCHA', 'falha')
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);
}

if (window.location.href.includes(md5('sucesso=false'))) { // dados incorretos ou conta não existe
    abrirjanela('red','Sua conta não foi localizada!<br>Por favor, verifique se os dados estão escritos corretamente.', 'Recuperação de Conta', 'falha')
    
    let nextURL = window.location.href.replace(md5('sucesso=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);

    nome.classList.add('vermei')
    email.classList.add('vermei')
}

$(document).keypress( // desativa tecla ENTER
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function vazio(item){ // verifica se o valor passado está vazio
    return item.trim() == ''
}

function apenasLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
    if(event.value != undefined){
        let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
        event.value = limpo.replace('-','').replace('_','')
    }
}

$("#recuperacao").submit(function(e) {
        e.preventDefault();
});

function validar(){
    if(vazio(nome.value)){
        alertaDeErro(nome.id, "Por favor, insira um nome válido!")
        nome.focus()
        nome.classList.add("vermei")

    } else if (vazio(email.value) ||  !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email.value)){
        alertaDeErro(email.id, "Por favor, insira um email válido!")
        email.focus()
        email.classList.add("vermei")

    } else if (grecaptcha.getResponse() == ""){
        alertaDeErro(captcha.id, 'Por favor, preencha o CAPTCHA!')

    } else {
        abrirjanela('blue','Validando Dados','Recuperação de Conta', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 4000)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
                document.getElementById('recuperacao').submit()
            })
    }
}