window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
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

function abrirjanela(cor, texto, titulo){
    let tamanho = 'p';
    let modo = 'alert';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}

// -------------------- fim código popup --------------------

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const assunto = document.getElementById('assunto')
const mensagem = document.getElementById('mensagem')
var logado = false

$(document).ready(function() {
    let nomeSalvo = document.getElementById('nomeSalvo').innerText.trim()
    let emailSalvo = document.getElementById('emailSalvo').innerText.trim()
    if(!vazio(nomeSalvo) && !vazio(emailSalvo)){
        nome.value = nomeSalvo
        email.value = emailSalvo
        logado = true
    }
});
function validarEmail(email){ // auto-explicativo
    if (!vazio(email)){
        var re = /\S+@\S+\.\S+/
        return re.test(email)
    } else {
        return true
    }
}

function validar(){
    let elementos = document.getElementsByTagName('input')
    mensagem.classList.remove('vermei')

    for(let i = 0; i < elementos.length ; i++){
        elementos[i].classList.remove('vermei')
    }
    if(vazio(nome.value)){
        alert('Por favor, preencha o nome!')
        nome.classList.add('vermei')
        nome.focus()

    } else if (vazio(email.value) || !validarEmail(email.value)){
        alert('Por favor, preencha o email!')
        email.classList.add('vermei')
        email.focus()

    } else if(vazio(assunto.value)){
        alert('Por favor, preencha o assunto!')
        assunto.classList.add('vermei')
        assunto.focus()

    } else if(vazio(mensagem.value)){
        alert('Por favor, preencha o campo de mensagem!')
        mensagem.classList.add('vermei')
        mensagem.focus()

    } else {
        abrirjanela('green','deu certo','Formulário enviado')
        document.getElementById('asdf_cancelar').style.display = 'none'
                setTimeout(nada , 4000)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
            document.getElementById('formContato').submit()
        })
    }

}