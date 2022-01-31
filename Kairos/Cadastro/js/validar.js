window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}
$('select').on('change', function() {
    if (this.value == "1") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();

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

function abrirjanela(cor, texto){
    var tamanho = 'p';
    var modo = 'alert';
    var titulo = '| Andamento Cadastro | 1/3';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}
var alerta=''

if (window.location.href.includes(md5('email=false'))){
    alerta='Email já cadastrado!<br>'
    document.getElementById("email").classList.add('vermei')
    
} 
if (window.location.href.includes(md5('cpf=false'))){
    alerta+='CPF já cadastrado!'
    document.getElementById("cpf").classList.add('vermei')
}

if (alerta != ''){
    abrirjanela('red',alerta)
    document.getElementById('nome').value=localStorage.getItem('nome')
    document.getElementById('tel').value=localStorage.getItem('tel')
    document.getElementById('cep').value=localStorage.getItem('cep')
    document.getElementById('numero').value=localStorage.getItem('numero')
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
        if (localStorage.getItem('numero')){
            document.getElementById('cep').focus()
        }
    })
}

var estado=""
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

function selecionar(obj){
    estado = obj.options[obj.selectedIndex].text
}



$("#cep").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val().toString().replace(/-/, '').replace('.', '')+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#rua").val(resposta.logradouro);
            $("#bairro").val(resposta.bairro);
            $("#cidade").val(resposta.localidade);
            $("#estado").val(resposta.uf);
            $("#estado").css('opacity', '1').change();
            document.getElementById("numero").focus();
            estado = resposta.uf;
        }
    });
});


function validar(){
    var nome = document.getElementById("nome")
    var tel = document.getElementById("tel")
    var email = document.getElementById("email")
    var cpf = document.getElementById("cpf")
    var senha = document.getElementById("senha")
    var confirm_senha = document.getElementById("confirm_senha")
    var cep = document.getElementById("cep")
    var rua = document.getElementById("rua")
    var numero = document.getElementById("numero")
    var bairro = document.getElementById("bairro")
    var cidade = document.getElementById("cidade")


    nome.classList.remove("vermei")
    email.classList.remove("vermei")
    tel.classList.remove("vermei")
    cpf.classList.remove("vermei")
    senha.classList.remove("vermei")
    confirm_senha.classList.remove("vermei")
    cep.classList.remove("vermei")
    rua.classList.remove("vermei")
    numero.classList.remove("vermei")
    bairro.classList.remove("vermei")
    cidade.classList.remove("vermei")
    document.getElementById("estado").classList.remove("vermei")

    if (tel.value.replace('(','').replace(')','').replace('-','').replace(' ','') == "") {
        alert("Por favor, preencha o telefone!");
        document.getElementById("tel").focus()
        tel.classList.add("vermei")

    } else if (email.value == "" ||  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)){
        alert("Por favor, insira um email válido!");
        document.getElementById("email").focus()
        email.classList.add("vermei")

    } else if (cpf.value.replace('.','').replace('-','') == "" || validar_cpf(cpf.value) == 1){
        alert("Por favor, insira um CPF válido!")
        document.getElementById("cpf").focus()
        document.getElementById("cpf").classList.add("vermei")

    } else if (cep.value.replace('.','').replace('-','') == ""){
        alert("Por favor, preencha o CEP!")
        document.getElementById("cep").focus()
        document.getElementById("cep").classList.add("vermei")

    } else if (rua.value == ""){
        alert("Por favor, preencha o Rua!")
        document.getElementById("rua").focus()
        document.getElementById("rua").classList.add("vermei")

    } else if (numero.value == ""){
        alert("Por favor, preencha o Número!")
        document.getElementById("numero").focus()
        document.getElementById("numero").classList.add("vermei")

    } else if (bairro.value == ""){
        alert("Por favor, preencha o Bairro!")
        document.getElementById("bairro").focus()
        document.getElementById("bairro").classList.add("vermei")

    } else if (cidade.value == ""){
        alert("Por favor, preencha a Cidade!")
        document.getElementById("cidade").focus()
        document.getElementById("cidade").classList.add("vermei")

    } else if (estado == ""){
        alert("Por favor, preencha o Estado!")
        document.getElementById("estado").focus()
        document.getElementById("estado").classList.add("vermei")

    } else if (senha.value == "" || confirm_senha.value == ""){
        alert("Por favor, preencha a senha!");
        document.getElementById("senha").focus()
        senha.classList.add("vermei")

    } else if (senha.value != confirm_senha.value){
        alert("Senhas não coincidem! Por favor, verifique-as!")
        document.getElementById("senha").focus()
        senha.classList.add("vermei")
        confirm_senha.classList.add("vermei")
        senha.value=""
        confirm_senha.value=""

    }else{
        localStorage.setItem(nome.id,nome.value)
        localStorage.setItem(tel.id,tel.value)
        localStorage.setItem(cep.id,cep.value)
        localStorage.setItem(numero.id,numero.value)
        var tamanho = 'p';
        var cor = 'blue';
        var modo = 'alert';
        var titulo = '| Andamento Cadastro | 1/3';
        var texto = 'Verificando Banco de Dados, caso tudo certo prosseguiremos.';
        janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
            document.getElementById('cadastro').submit();
        })
    }
}