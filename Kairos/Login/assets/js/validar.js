window.onload = function () {
    window.setTimeout(fadeout, 500);
}
function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
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
function abrirjanela(cor, texto, titulo){
    var tamanho = 'p';
    var modo = 'alert';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}
if (window.location.href.includes(md5('login=false'))) {
    abrirjanela('red','Credenciais incorretas!<br>Por favor, verifique os dados inseridos!', '| Falha no login |')
    
    let nextURL = window.location.href.replace(md5('login=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Login', nextURL);
    document.getElementById("email").classList.add('vermei')
    document.getElementById("senha").classList.add('vermei')
}

if (window.location.href.includes(md5('sucesso=true'))) {
    abrirjanela('green','Dados cadastrados com sucesso!', 'Cadastro')
    
    let nextURL = window.location.href.replace(md5('sucesso=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Login', nextURL);
}

function validar(){
    document.getElementById('butao').setAttribute('name', 'butao');
    var email = document.getElementById("email")
    var senha = document.getElementById("senha")
    $("#login").submit(function(e) {
        e.preventDefault();
    });
    email.classList.remove("vermei")
    senha.classList.remove("vermei")
    if (email.value == "" ||  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)){
        alert("Por favor, insira um email válido!");
        $(document).ready(function () {
            $("#email").focus();
            document.getElementById("email").focus();
          });
        email.classList.add("vermei")
    } else if (senha.value == ""){
        alert("Por favor, preencha a senha!");
        $(document).ready(function () {
            $("#senha").focus();
            document.getElementById("senha").focus();
          });
        senha.classList.add("vermei")
    } else{
        document.getElementById('login').submit();
        localStorage.clear();
    }
}