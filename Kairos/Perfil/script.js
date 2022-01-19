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
function abrirjanela(cor, texto){
    var tamanho = 'p';
    var modo = 'alert';
    var titulo = '| Logado com sucesso |';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}
// -------------------- fim código popup --------------------

function editar(){
    var conteudo_cpf = document.getElementById('cpf').innerText
    var conteudo_tel = document.getElementById('tel').innerText
    var conteudo_email = document.getElementById('email').innerText

    $("#cpf_input").toggle();
    $("#tel_input").toggle();
    $("#email_input").toggle();

    $("#editar").toggle();
    $("#cancelar").toggle();
    $("#salvar").toggle();

    $("#cpf").toggle();
    $("#tel").toggle();
    $("#email").toggle();

    document.getElementById('cpf_input').placeholder = conteudo_cpf
    document.getElementById('tel_input').placeholder = conteudo_tel
    document.getElementById('email_input').placeholder = conteudo_email

}

function editar_empresa(){
    var conteudo_nome_empresa = document.getElementById('nome_empresa').innerText
    var conteudo_nome_fantasia = document.getElementById('nome_fantasia').innerText
    var conteudo_cnpj = document.getElementById('cnpj').innerText
    var conteudo_ramo = document.getElementById('ramo').innerText
    var conteudo_cep = document.getElementById('cep').innerText
    var conteudo_rua = document.getElementById('rua').innerText
    var conteudo_numero = document.getElementById('numero').innerText
    var conteudo_bairro = document.getElementById('bairro').innerText
    var conteudo_cidade = document.getElementById('cidade').innerText
    var conteudo_estado = document.getElementById('estado').innerText

    $("#nome_empresa_input").toggle();
    $("#nome_fantasia_input").toggle();
    $("#cnpj_input").toggle();
    $("#ramo_input").toggle();
    $("#cep_input").toggle();
    $("#rua_input").toggle();
    $("#numero_input").toggle();
    $("#bairro_input").toggle();
    $("#cidade_input").toggle();
    $("#estado_input").toggle();

    $("#editar_empresa").toggle();
    $("#cancelar_empresa").toggle();
    $("#salvar_empresa").toggle();

    $("#nome_empresa").toggle();
    $("#nome_fantasia").toggle();
    $("#cnpj").toggle();
    $("#ramo").toggle();
    $("#cep").toggle();
    $("#rua").toggle();
    $("#numero").toggle();
    $("#bairro").toggle();
    $("#cidade").toggle();
    $("#estado").toggle();


    document.getElementById('nome_empresa_input').placeholder = conteudo_nome_empresa
    document.getElementById('nome_fantasia_input').placeholder = conteudo_nome_fantasia
    document.getElementById('cnpj_input').placeholder = conteudo_cnpj
    document.getElementById('ramo_input').placeholder = conteudo_ramo
    document.getElementById('cep_input').placeholder = conteudo_cep
    document.getElementById('rua_input').placeholder = conteudo_rua
    document.getElementById('numero_input').placeholder = conteudo_numero
    document.getElementById('bairro_input').placeholder = conteudo_bairro
    document.getElementById('cidade_input').placeholder = conteudo_cidade
    document.getElementById('estado_input').placeholder = conteudo_estado

}