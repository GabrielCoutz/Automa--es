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


let timeout;
let password = document.getElementById('senha_nova')
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
    this.classList.toggle('bi-eye');
});
}

mudar_senha('togglePassword','senha_nova')
mudar_senha('togglePassword_dup','senha_nova_dup')

function StrengthChecker(PasswordParameter){
    if(PasswordParameter.length < 10){
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

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
}

if (window.location.href.includes(md5('conta_encontrada=true'))) {
    abrirjanela('green','Sua conta foi localizada com sucesso!<br>Agora basta inserir sua nova senha.', 'Recuperação de Conta', 'encontrado')
    
    let nextURL = window.location.href.replace(md5('conta_encontrada=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);
}

if (window.location.href.includes(md5('erro=true'))) { // erro de cadastro
    abrirjanela('red','<br>Não foi possível realizar a alteração de senha!', 'Conta não sincronizada','falha')
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(nada , 4000)
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
            window.location.href = "../../index"})

    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);
}

const senha_nova = document.getElementById('senha_nova')
const senha_nova_dup = document.getElementById('senha_nova_dup')

function vazio(item){ // verifica se o valor passado está vazio
    return item.trim() == ''
}

$("#mudar").submit(function(e) {
    e.preventDefault();
});

function validar(){
    limpar_inputs()
    if(vazio(senha_nova.value) || vazio(senha_nova_dup.value)){
        alertaDeErro(senha_nova.id, "Por favor, preencha as senhas!")
        senha_nova.focus()
        senha_nova_dup.classList.add("vermei")
        senha_nova.classList.add("vermei")

    } else if (senha_nova.value != senha_nova_dup.value){
        alertaDeErro(senha_nova.id, "Senhas não coincidem! Verifique-as e tente novamente")
        senha_nova_dup.classList.add('vermei')
        senha_nova.classList.add('vermei')
    } else {
        document.getElementById('mudar').submit()
    }
}