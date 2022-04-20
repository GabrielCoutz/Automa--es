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
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div><span id='corpo'>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
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
    var tamanho = 'p';
    var modo = 'alert';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}

function CriarAnalise(){ // captura a resposta do usuario sobre a realização da análise e responde de acordo
    janelaPopUp.abre( "asdf", "p" + " "  + 'blue' + ' ' + 'confirm',  'Análise não realizada' , 'Parece que você não fez nenhuma análise ainda<br>Gostaria de iniciá-la agora?')
    document.getElementById('asdf_cancelar').style.marginLeft = '10px'
    document.getElementById('asdf_cancelar').innerHTML = 'Não'
    document.getElementById('asdf_cancelar').style.width = '40%'

    document.getElementById('asdf_enviar').innerHTML = 'Sim'
    document.getElementById('asdf_enviar').style.marginRight = '10px'
    document.getElementById('asdf_enviar').style.width = '40%'

    document.getElementById('asdf_cancelar').addEventListener('click',CancelarAnalise)

    document.getElementById('asdf_enviar').addEventListener('click', IniciarAnalise)

}

// -------------------- fim código popup --------------------

const forcas = document.getElementById('forcas')
const fraquezas = document.getElementById('fraquezas')
const oportunidades = document.getElementById('oportunidades')
const ameacas = document.getElementById('ameacas')


document.getElementById('orientacao-fxf').addEventListener('mouseenter',function (){
    forcas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    forcas.style.borderRadius = '10px';
    fraquezas.style.opacity = '0.4';
    ameacas.style.opacity = '0.4';

    oportunidades.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    oportunidades.style.borderRadius = '10px';
})

document.getElementById('orientacao-fxf').addEventListener('mouseout',function (){
    forcas.style.boxShadow = 'none';
    forcas.style.borderRadius = '0px';
    fraquezas.style.opacity = '1';
    ameacas.style.opacity = '1';

    oportunidades.style.boxShadow = 'none';
    oportunidades.style.borderRadius = '0px';
})
//---------------------------------------------------------------------------------------------------------
document.getElementById('orientacao-fxa').addEventListener('mouseenter',function (){
    forcas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    forcas.style.borderRadius = '10px';
    fraquezas.style.opacity = '0.4';
    oportunidades.style.opacity = '0.4';

    ameacas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    ameacas.style.borderRadius = '10px';
})

document.getElementById('orientacao-fxa').addEventListener('mouseout',function (){
    forcas.style.boxShadow = 'none';
    forcas.style.borderRadius = '0px';
    fraquezas.style.opacity = '1';
    oportunidades.style.opacity = '1';

    ameacas.style.boxShadow = 'none';
    ameacas.style.borderRadius = '0px';
})
//---------------------------------------------------------------------------------------------------------
document.getElementById('orientacao-fzxo').addEventListener('mouseenter',function (){
    fraquezas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    fraquezas.style.borderRadius = '10px';
    forcas.style.opacity = '0.4';
    ameacas.style.opacity = '0.4';

    oportunidades.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    oportunidades.style.borderRadius = '10px';
})

document.getElementById('orientacao-fzxo').addEventListener('mouseout',function (){
    fraquezas.style.boxShadow = 'none';
    fraquezas.style.borderRadius = '0px';
    forcas.style.opacity = '1';
    ameacas.style.opacity = '1';

    oportunidades.style.boxShadow = 'none';
    oportunidades.style.borderRadius = '0px';
})
//---------------------------------------------------------------------------------------------------------
document.getElementById('orientacao-fzxa').addEventListener('mouseenter',function (){
    fraquezas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    fraquezas.style.borderRadius = '10px';
    forcas.style.opacity = '0.4';
    oportunidades.style.opacity = '0.4';

    ameacas.style.boxShadow = '0px 0px 7px -1px rgb(0 0 0 / 20%)';
    ameacas.style.borderRadius = '10px';
})

document.getElementById('orientacao-fzxa').addEventListener('mouseout',function (){
    fraquezas.style.boxShadow = 'none';
    fraquezas.style.borderRadius = '0px';
    forcas.style.opacity = '1';
    oportunidades.style.opacity = '1';

    ameacas.style.boxShadow = 'none';
    ameacas.style.borderRadius = '0px';
})



const IniciarAnalise = function(){ // redireciona o usuario para página de analise
    let popup = function(){
        abrirjanela('blue','Tudo bem, redirecionando para página de análise...','Análise não realizada')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "assets/php/enviar?analise=true"
    }

    setTimeout(popup, 1500)

    setTimeout(redirecionar, 6000)
}

const CancelarAnalise = function(){ // redireciona o usuario para página inicial
    let popup = function(){
        abrirjanela('blue','Redirecionando para página do usuário...','Análise não realizada')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "../usuario"
    }

    setTimeout(popup, 1500)
    setTimeout(redirecionar, 6000)
}

function erro(){ // leva o usuario para página de login devido ao erro de sincronização
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        window.location.href = "../../Login/login"
    })
    document.getElementById('asdf_cancelar').click()
}

if (window.location.href.includes(md5('erro=true'))) { // erro de login
    abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada')
    document.getElementsByClassName('content')[0].style.display = 'none'
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(erro , 3000)
    
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Analise', nextURL);

}

if(window.location.href.includes(md5('sucesso=true'))){ // janela de êxito em alteração
    abrirjanela('green','Dados alterados com êxito.', 'Alteração realizada com sucesso')

    let nextURL = window.location.href.replace(md5('sucesso=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Analise', nextURL);
}

if(window.location.href.includes(md5('sucesso=false'))){ // janela de erro na realização da análise
    abrirjanela('red','Parece que houve um erro durante o processamento de dados.<br>Por favor, tente novamente mais tarde ou entre em contato conosco.', 'Análise não concluída')

    document.getElementById('asdf_cancelar').addEventListener('click',CancelarAnalise)

    let nextURL = window.location.href.replace(md5('sucesso=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Analise', nextURL);
}

if (window.location.href.includes(md5('analise=false'))) { // pergunta ao usuário se deseja iniciar a análise ou se prefere fazer depois
    CriarAnalise()
    let nextURL = window.location.href.replace(md5('analise=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Analise', nextURL);

}

function sair(){
    localStorage.clear()
    window.location.href= '../../index'
}

function fechar_menu(){
    document.getElementsByTagName('html')[0].classList.remove('nav-open')
    document.getElementsByClassName('close-layer')[0].classList.add('none')
}