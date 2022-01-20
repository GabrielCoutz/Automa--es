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
function abrirjanela(cor, texto, titulo){
    var tamanho = 'p';
    var modo = 'alert';
    janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
}
// -------------------- fim código popup --------------------
var alerta = ""

document.getElementById("email_input").classList.remove('vermei')
document.getElementById("cpf_input").classList.remove('vermei')

if (window.location.href.includes(md5('email_duplicado=true'))) {
    alerta+='Email já cadastrado!<br>'
    document.getElementById("email_input").classList.add('vermei')
}
if (window.location.href.includes(md5('cpf_duplicado=true'))) {
    alerta+='CPF já cadastrado!'
    document.getElementById("cpf_input").classList.add('vermei')
}

if(alerta != ""){
    abrirjanela('red',alerta, '| Alteração Inválida |')
    document.getElementById('editar').click()
} else if(window.location.href.includes(md5('livre=true'))){
    abrirjanela('green','tudo certo', '| Alteração realizada com sucesso |')
}


function alternar_edicao(){
    $("#cpf_input").toggle();
    $("#tel_input").toggle();
    $("#email_input").toggle();

    $("#editar").toggle();
    $("#cancelar").toggle();
    $("#salvar").toggle();

    $("#cpf").toggle();
    $("#tel").toggle();
    $("#email").toggle();
}

function alternar_edicao_empresa(){
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
}

function editar_usuario(){
    let conteudo_cpf = document.getElementById('cpf').innerText
    let conteudo_tel = document.getElementById('tel').innerText
    let conteudo_email = document.getElementById('email').innerText

    let len_email = document.getElementById('aemail').offsetWidth+13;

    alternar_edicao()

    document.getElementById('cpf_input').placeholder = conteudo_cpf
    document.getElementById('tel_input').placeholder = conteudo_tel
    document.getElementById('email_input').placeholder = conteudo_email

    document.getElementById('email_input').style.width = len_email+'px'
}


function cancelar_usuario(){
    document.getElementById('cpf_input').value = ''
    document.getElementById('tel_input').value = ''
    document.getElementById('email_input').value = ''
    
    alternar_edicao()
}

function cancelar_empresa(){
    document.getElementById('nome_fantasia_input').value = ''
    document.getElementById('nome_empresa_input').value = ''
    document.getElementById('cnpj_input').value = ''
    document.getElementById('ramo_input').value = ''
    document.getElementById('cep_input').value = ''
    document.getElementById('rua_input').value = ''
    document.getElementById('numero_input').value = ''
    document.getElementById('bairro_input').value = ''
    document.getElementById('cidade_input').value = ''
    document.getElementById('estado_input').value = ''

    alternar_edicao_empresa()
}

function editar_empresa(){
    let conteudo_nome_empresa = document.getElementById('nome_empresa').innerText
    let conteudo_nome_fantasia = document.getElementById('nome_fantasia').innerText
    let conteudo_cnpj = document.getElementById('cnpj').innerText
    let conteudo_ramo = document.getElementById('ramo').innerText
    let conteudo_cep = document.getElementById('cep').innerText
    let conteudo_rua = document.getElementById('rua').innerText
    let conteudo_numero = document.getElementById('numero').innerText
    let conteudo_bairro = document.getElementById('bairro').innerText
    let conteudo_cidade = document.getElementById('cidade').innerText
    let conteudo_estado = document.getElementById('estado').innerText

    let len_rua = document.getElementById('arua').offsetWidth+13;
    document.getElementById('rua_input').style.width = len_rua+'px'

    alternar_edicao_empresa()

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

function salvar_usuario(){
    document.getElementById("dados_usuario").submit();


}
