window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function nada(){
    document.getElementById('asdf_cancelar').click()
}
const nome = document.getElementById("nome")
const tel = document.getElementById("tel")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const confirm_senha = document.getElementById("confirm_senha")
const captcha = document.getElementById("captcha")
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


function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Cadastro', nextURL);
}

switch (true) { // verifica se há erros passados na URL
    case window.location.href.includes(md5('erro=true')): //erro no captcha
        abrirjanela('red','Possível Fraude detectada!<br>Por favor, insira as informações novamente.','Erro no CAPTCHA', 'falha')
        limparURL(md5('erro=true'))
        break;

    case window.location.href.includes(md5('email=false')): //email já cadastrado
        email.classList.add('vermei')
        abrirjanela('red','Email já utilizado!', 'Dados Duplicados','falha')
        localStorage.setItem('erro',1)
        cep.value = localStorage.getItem('cep')
        nome.value = localStorage.getItem('nome')
        tel.value = localStorage.getItem('tel')
        numero.value = localStorage.getItem('numero')

        ler(localStorage.getItem('cep'))
        document.getElementById('cadastro').focus()
        limparURL(md5('email=false'))
        break;
}

function vazio(item){ // verifica se o valor passado está vazio
    return item.trim() == ''
}

let timeout;
let password = document.getElementById('senha')
let strengthBadge = document.getElementById('StrengthDisp')
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

password.addEventListener("input", () => {
    strengthBadge.style.display= 'block'
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(password.value), 500);
    if(password.value.length !== 0){
        strengthBadge.style.display != 'block'
    } else{
        strengthBadge.style.display = 'none'
    }
});

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
mudar_senha('togglePassword_confirm','confirm_senha')

function StrengthChecker(PasswordParameter){
    if(PasswordParameter.length <= 9){
        strengthBadge.style.color="red"
        strengthBadge.textContent = 'Senha muito curta'
    }else if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.color="green"
        strengthBadge.textContent = 'Senha Forte'
    } else if(mediumPassword.test(PasswordParameter)){
        
        strengthBadge.style.color="#b6bf31";
        strengthBadge.textContent = 'Senha Mediana'
    } else{
        strengthBadge.style.color="red"
        strengthBadge.textContent = 'Senha Fraca'
    }
}

function validarEmail(email){ // auto-explicativo
    if (!vazio(email)){
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email)
    } else {
        return false
    }
}

function apenasLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
    if(event.value != undefined){
        let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
        event.value = limpo.replace('-','').replace('_','')
    }
}

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
}

$(document).ready(function(){ // desabilita CTRL+V por motivos de incompatibilidade de máscara
    $('#tel').on("cut copy paste",function(e) {
       e.preventDefault();
    });
    $('#cpf').on("cut copy paste",function(e) {
        e.preventDefault();
     });
     $('#numero').on("cut copy paste",function(e) {
        e.preventDefault();
     });
});

$(document).keypress( // desativa tecla ENTER
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

const dispararEvento = function(elemento, evento, stringCondicao){  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

    var condicao // função usada para validação

    switch(stringCondicao){ // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
        case 'condicaoTel': var condicao = function(){ return tel.value.length != 15}; break;
        case 'condicaoEmail': var condicao = function(){ return !validarEmail(email.value)}; break;
        case 'condicaoSenha': var condicao = function(){ return vazio(senha.value) || vazio(confirm_senha.value)}; break;
    }

    let funcao = function(){ // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
        if(!condicao()){
            elemento.classList.remove('vermei')
            document.getElementById(elemento.id+'Alert').classList.add('none')
            elemento.removeEventListener(evento,funcao)
            document.getElementById('butao').disabled = false
        }
    }

    // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
    document.getElementById('butao').disabled = true
    elemento.addEventListener(evento,funcao)

}

function validar(){
    limpar_inputs()

    if (vazio(nome.value)){
        alertaDeErro(nome.id, "Insira apenas letras!")
        nome.focus()
        nome.classList.add("vermei")

    } else if (tel.value.length != 15) {
        dispararEvento(tel, 'keyup', 'condicaoTel')
        alertaDeErro(tel.id, "Preencha o telefone!")
        tel.focus()
        tel.classList.add("vermei")

    } else if (!validarEmail(email.value)){
        dispararEvento(email, 'keyup', 'condicaoEmail')
        alertaDeErro(email.id, "Insira um email válido!")
        email.focus()
        email.classList.add("vermei")

    } else if (vazio(senha.value) || vazio(confirm_senha.value)){
        dispararEvento(senha, 'keyup', 'condicaoSenha')
        alertaDeErro(senha.id, "Preencha a senha!")
        senha.focus()
        senha.classList.add("vermei")
        confirm_senha.classList.add("vermei")

    } else if (senha.value != confirm_senha.value){
        alertaDeErro(senha.id, "Senhas não coincidem! Por favor, verifique-as!")
        senha.focus()
        senha.classList.add("vermei")
        confirm_senha.classList.add("vermei")
        senha.value=""
        confirm_senha.value=""

    } else if (grecaptcha.getResponse() == ""){
        alertaDeErro(captcha.id, 'Preencha o CAPTCHA!')

    } else {
        localStorage.setItem(nome.id,nome.value)
        localStorage.setItem(tel.id,tel.value)
        abrirjanela('blue','Validando Dados','Andamento Cadastro', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 4000)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
                document.getElementById('cadastro').submit()
            })
    }
}