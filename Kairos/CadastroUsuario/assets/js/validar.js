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

// -------------------- início código popup --------------------
var janelaPopUp = new Object();

janelaPopUp.abre = function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){
    var cancelar = (textoCancelar !== undefined)? textoCancelar: 'Ok';
    var enviar = (textoEnviar !== undefined)? textoEnviar: 'Send';
    classes += ' ';
    var classArray = classes.split(' ');
    classes = '';
    classesFundo = '';
    var classBot = '';
    $.each(classArray, function(index, value){
        switch(value){
            case 'alert' : classBot += ' alert '; break;
            case 'blue' : classesFundo += this + ' ';
            case 'green' : classesFundo += this + ' ';
            case 'red' : classesFundo += this + ' ';
            case 'white': classesFundo += this + ' ';
            case 'orange': classesFundo += this + ' ';
            case 'purple': classesFundo += this + ' ';
            default : classes += this + ' '; break;
        }
    });
    var popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
    $("window, body").css('overflow', 'hidden');
    
    $("body").append(popFundo);
    $("body").append(janela);
    $("body").append(popFundo);
     //alert(janela);
    $("#popFundo_" + id).fadeIn("fast");
    $("#" + id).addClass("popUpEntrada");
    
    $("#" + id + '_cancelar').on("click", function(){
        if((functionCancelar !== undefined) && (functionCancelar !== '')){
            functionCancelar();
            
        }else{
            janelaPopUp.fecha(id);
        }
    });
    $("#" + id + '_enviar').on("click", function(){
        if((functionEnviar !== undefined) && (functionEnviar !== '')){
            functionEnviar();
        }else{
            janelaPopUp.fecha(id);
        }
    });
    
};

janelaPopUp.fecha = function(id){
    if(id !== undefined){
        $("#" + id).removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $("#popFundo_" + id).fadeOut(1000, function(){
                $("#popFundo_" + id).remove();
                $("#" + $(this).attr("id") + ", #" + id).remove();
                if (!($(".popUp")[0])){
                    $("window, body").css('overflow', 'auto');
                }
            });

    }
    else{
        $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $(".popUpFundo").fadeOut(1000, function(){
                $(".popUpFundo").remove();
                $(".popUp").remove();
                $("window, body").css('overflow', 'auto');
            });
            
       
    }
    
}
// -------------------- fim código popup --------------------

var alerta = ''
const nome = document.getElementById("nome")
const tel = document.getElementById("tel")
const email = document.getElementById("email")
const cpf = document.getElementById("cpf")
const senha = document.getElementById("senha")
const confirm_senha = document.getElementById("confirm_senha")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const endereco = document.getElementById("endereco")
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

function ler(cep){

    if(localStorage.getItem('erro') == 1){
        cep = document.getElementById('cep')
    }

    if(cep.value.length == 10){
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/unicode/',
                dataType: 'json',
                success: function(resposta){
                    if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                        abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','Dados Inválidos')
                        cep.classList.add('vermei')
                        cep.focus()
                        return
                    } else {
                        cep.classList.remove('vermei')
                        $("#rua").val(resposta.logradouro);
                        $("#bairro").val(resposta.bairro);
                        $("#cidade").val(resposta.localidade);
                        $("#estado").val(resposta.uf);
                        $("#estado").css('opacity', '1').change();

                        let endereco_full = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf

                        $('#edit').toggle()

                        endereco.innerHTML = endereco_full

                        numero.focus();
                }}
            });
    }
}

function abrirjanela(cor, texto, titulo){
    let tamanho = 'p';
    let modo = 'alert';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}

if (window.location.href.includes(md5('erro=true'))){ //erro no captcha
    abrirjanela('red','Possível Fraude detectada!<br>Por favor, insira as informações novamente.','Erro no CAPTCHA')
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Cadastro', nextURL);
}

if (window.location.href.includes(md5('email=false'))){ //email já cadastrado
    alerta='Email já cadastrado!<br>'
    let nextURL = window.location.href.replace(md5('email=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Cadastro', nextURL);
    email.classList.add('vermei')
    
} 

if (window.location.href.includes(md5('cpf=false'))){ //cpf já cadastrado
    let nextURL = window.location.href.replace(md5('cpf=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Cadastro', nextURL);
    alerta+='CPF já cadastrado!'
    cpf.classList.add('vermei')
}

if (alerta != ''){
    localStorage.setItem('erro',1)
    cep.value = localStorage.getItem('cep')
    nome.value = localStorage.getItem('nome')
    tel.value = localStorage.getItem('tel')
    numero.value = localStorage.getItem('numero')

    ler(localStorage.getItem('cep'))
    document.getElementById('cadastro').focus()

    abrirjanela('red',alerta,'Andamento Cadastro')
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
    this.classList.toggle('bi-eye');
});
}

mudar_senha('togglePassword','senha')
mudar_senha('togglePassword_confirm','confirm_senha')

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

function validar_cpf(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
    cpf = String(cpf).replace('.','').replace('-','').replace('.','')
  if (  cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" ) return 1;


    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return 1;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return 1;
    return 0
}

function validarEmail(email){ // auto-explicativo
    if (!vazio(email)){
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email)
    } else {
        return false
    }
}

cpf.addEventListener('keyup',function(){
    if(cpf.value.length == 14){
        if (cpf.value.replace('.','').replace('-','') == "" || validar_cpf(cpf.value) == 1){
            alertaDeErro(cpf.id, 'Por favor, insira um CPF válido!')
            cpf.focus()
            cpf.classList.add("vermei")
            document.getElementById('butao').disabled = true
            document.getElementById('butaoAlert').classList.remove('none')
        } else {
            document.getElementById(cpf.id+'Alert').classList.add('none')
            cpf.classList.remove("vermei")
            document.getElementById('butao').disabled = false
            document.getElementById('butaoAlert').classList.add('none')
        }
    }
})

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
        case 'condicaoCPF': var condicao = function(){ return validar_cpf(cpf.value) == 1}; break;
        case 'condicaoCep': var condicao = function(){ return cep.value.length != 10}; break;
        case 'condicaoNumero': var condicao = function(){ return vazio(numero.value)}; break;
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
        alertaDeErro(nome.id, "Por favor, insira um nome válido!")
        nome.focus()
        nome.classList.add("vermei")

    } else if (tel.value.length != 15) {
        dispararEvento(tel, 'keyup', 'condicaoTel')

        alertaDeErro(tel.id, "Por favor, preencha o telefone!")
        tel.focus()
        tel.classList.add("vermei")

    } else if (!validarEmail(email.value)){
        dispararEvento(email, 'keyup', 'condicaoEmail')
        alertaDeErro(email.id, "Por favor, insira um email válido!")
        email.focus()
        email.classList.add("vermei")

    } else if(vazio(cpf.value)){
        dispararEvento(cpf, 'keyup', 'condicaoCPF')
        alertaDeErro(cpf.id, 'Por favor, preencha o CPF!')
        cpf.focus()
        cpf.classList.add('vermei')

    } else if(vazio(cep.value)){
        dispararEvento(cep, 'keyup', 'condicaoCep')
        alertaDeErro(cep.id, 'Por favor, preencha o CEP!')
        cep.focus()
        cep.classList.add('vermei')

    } else if (vazio(numero.value)){
        dispararEvento(numero, 'keyup', 'condicaoNumero')
        alertaDeErro(numero.id, "Por favor, preencha o Número!")
        numero.focus()
        numero.classList.add("vermei")

    } else if (vazio(senha.value) || vazio(confirm_senha.value)){
        dispararEvento(senha, 'keyup', 'condicaoSenha')
        alertaDeErro(senha.id, "Por favor, preencha a senha!")
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
        alertaDeErro(captcha.id, 'Por favor, preencha o CAPTCHA!')
    } else {
        localStorage.setItem(nome.id,nome.value)
        localStorage.setItem(tel.id,tel.value)
        localStorage.setItem(cep.id,cep.value)
        localStorage.setItem(numero.id,numero.value)
        abrirjanela('blue','Validando Dados ... ','Andamento Cadastro')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 4000)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
                document.getElementById('cadastro').submit()
            })
    }
}