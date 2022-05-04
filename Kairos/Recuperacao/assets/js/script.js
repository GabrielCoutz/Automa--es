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
// -------------------- início código popup --------------------
var janelaPopUp = new Object();
let icone = ''
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
    let src = ''
    let trigger = "trigger='loop' "
    let delay = "delay='1000' "
    let colors = "colors= 'primary:#121331,secondary:#ffffff' "
    let style= "style= 'width:46px;height:46px'> "

    switch (true) { // determina qual ícone aparecerá no popup de acordo com a string passada na varaiável 'icone'
        case icone == 'sucesso':
            src = "src='https://cdn.lordicon.com/lupuorrc.json' "
            break;
        case icone == 'falha':
            src = "src= 'https://cdn.lordicon.com/tdrtiskw.json' ";
            break;
        case icone == 'carregar':
            src = "src= 'https://cdn.lordicon.com/dpinvufc.json' "
            delay = "delay = '10' "
            colors = " colors= 'primary:#ffffff,secondary:#ffffff' "
            break;
    }
    var popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div>"+"<lord-icon " + src + trigger + delay + colors + style + "</lord-icon><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
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
function abrirjanela(cor, texto, titulo, trigger){
    let tamanho = 'p';
    let modo = 'alert';
    icone = trigger
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}
// -------------------- fim código popup --------------------
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
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
    abrirjanela('red','Sua conta não foi localizada!<br><br>Por favor, verifique se os dados estão escritos corretamente.', 'Recuperação de Conta', 'falha')
    
    let nextURL = window.location.href.replace(md5('sucesso=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);

    nome.classList.add('vermei')
    email.classList.add('vermei')
    cpf.classList.add('vermei')
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

$(document).ready(function(){ // desabilita CTRL+V por motivos de incompatibilidade de máscara
    $('#cpf').on("cut copy paste",function(e) {
        e.preventDefault();
     });
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
    } else if (vazio(cpf.value)){
        alertaDeErro(cpf.id, 'Por favor, preencha o CPF!')
        cpf.focus()
        cpf.classList.add('vermei')
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