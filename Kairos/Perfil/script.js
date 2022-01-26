window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const conteudo_rua = document.getElementById('rua_empresa').innerText
const conteudo_bairro = document.getElementById('bairro_empresa').innerText
const conteudo_estado = document.getElementById('estado_empresa').innerText
const conteudo_cidade = document.getElementById('cidade_empresa').innerText

const conteudo_nome_empresa = document.getElementById('nome_empresa').innerText
const conteudo_nome_fantasia = document.getElementById('nome_fantasia').innerText
const conteudo_cnpj = document.getElementById('cnpj').innerText
const conteudo_ramo = document.getElementById('ramo').innerText
const conteudo_cep = document.getElementById('cep_empresa').innerText
const conteudo_numero = document.getElementById('numero_empresa').innerText

$(function(){
		
    $(document.body).on('click', '.changeType' ,function(){
        $(this).closest('.phone-input').find('.type-text').text($(this).text());
        $(this).closest('.phone-input').find('.type-input').val($(this).data('type-value'));
    });
    
    $(document.body).on('click', '.btn-remove-phone' ,function(){
        $(this).closest('.phone-input').remove();
    });
    
    
    $('.btn-add-phone').click(function(){

        var index = $('.phone-input').length + 1;
        var num = "'(00) 0000-00009'"
        $('.phone-list').append(''+
                '<div class="input-group phone-input">'+
                    '<input type="tel" name="phone['+index+'][number]" placeholder="(00) 0000-00000" id="tel_input" class="adicional" onkeypress="$(this).mask('+num+')"/>'+
                    '<input type="hidden" name="phone['+index+'][type]" class="type-input"/>'+
                    '<span class="input-group-btn">'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button"><span class="lnr lnr-cross"></span></button>'+
                    '</span>'+
                '</div>'
        );

    });
    
});

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

if (window.location.href.includes(md5('email_duplicado=true'))) {
    alerta+='Email já cadastrado!<br>'
    document.getElementById("email_input").classList.add('vermei')
    
    let nextURL = window.location.href.replace(md5('email_duplicado=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

if (window.location.href.includes(md5('nome_empresa_duplicado=true'))) { // nome_empresa
    alerta+='Nome para Empresa já cadastrado!<br>'
    document.getElementById("nome_empresa_input").classList.add('vermei')
    
    let nextURL = window.location.href.replace(md5('nome_empresa_duplicado=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}
if (window.location.href.includes(md5('nome_fantasia_duplicado=true'))) { //nome_fantasia
    alerta+='Nome Fantasia já cadastrado!<br>'
    document.getElementById("nome_fantasia_input").classList.add('vermei')
    
    let nextURL = window.location.href.replace(md5('nome_fantasia_duplicado=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

if(alerta != ""){
    abrirjanela('red',alerta, '| Alteração Inválida |')
    document.getElementById('editar').click()

} else if(window.location.href.includes(md5('livre=true'))){
    abrirjanela('green','Dados alterados com êxito.', '| Alteração realizada com sucesso |')

    let nextURL = window.location.href.replace(md5('livre=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}


$('select').on('change', function() {
    if (this.value == "1") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();

$("#cep_empresa_input").focusout(function(){
$.ajax({
    url: 'https://viacep.com.br/ws/'+$(this).val().toString().replace(/-/, '').replace('.', '')+'/json/unicode/',
    dataType: 'json',
    success: function(resposta){
        document.getElementById('rua_empresa').innerHTML = resposta.logradouro
        document.getElementById('bairro_empresa').innerHTML = resposta.bairro
        document.getElementById('cidade_empresa').innerHTML = resposta.localidade
        document.getElementById('estado_empresa').innerHTML = resposta.uf
        document.getElementById('numero_empresa_input').focus()
    }
});
});

function alternar_edicao(){
    $("#tel_input").toggle();
    $("#add_tel").toggle();
    $("#email_input").toggle();

    $("#editar").toggle();
    $("#cancelar").toggle();
    $("#salvar").toggle();

    $("#tel").toggle();
    $("#email").toggle();
}

function alternar_edicao_empresa(){
    $("#nome_empresa_input").toggle();
    $("#nome_fantasia_input").toggle();
    // $("#cnpj_input").toggle();
    $("#ramo_input").toggle();
    $("#cep_empresa_input").toggle();
    // $("#rua_input").toggle();
    $("#numero_empresa_input").toggle();
    // $("#bairro_input").toggle();
    // $("#cidade_input").toggle();
    // $("#estado_empresa_input").toggle();

    $("#editar_empresabtn").toggle();
    $("#cancelar_empresabtn").toggle();
    $("#salvar_empresabtn").toggle();

    $("#nome_empresa").toggle();
    $("#nome_fantasia").toggle();
    // $("#cnpj").toggle();
    $("#ramo").toggle();
    $("#cep_empresa").toggle();
    // $("#rua").toggle();
    $("#numero_empresa").toggle();
    // $("#bairro").toggle();
    // $("#cidade").toggle();
    // $("#estado_empresa").toggle();
}

function sair(){
    window.location.href= '../index.php'
}

function editar_usuario(){
    let conteudo_tel = document.getElementById('tel').innerText
    let conteudo_email = document.getElementById('email').innerText

    alternar_edicao()

    document.getElementById('tel_input').placeholder = conteudo_tel.slice(0,15)
    document.getElementById('email_input').placeholder = conteudo_email

}


function cancelar_usuario(){
    document.getElementById('tel_input').value = ''
    document.getElementById('email_input').value = ''
    $('.adicional').closest('.phone-input').remove();
    document.getElementById("tel_input").classList.remove('vermei')

    alternar_edicao()
}

function cancelar_empresa(){
    document.getElementById('nome_fantasia_input').value = ''
    document.getElementById('nome_empresa_input').value = ''
    document.getElementById('cnpj_input').value = ''
    document.getElementById('ramo_input').value = ''
    document.getElementById('cep_empresa_input').value = ''
    document.getElementById('numero_empresa_input').value = ''
    document.getElementById('rua_empresa').innerHTML = conteudo_rua
    document.getElementById('bairro_empresa').innerHTML = conteudo_bairro
    document.getElementById('cidade_empresa').innerHTML = conteudo_cidade
    document.getElementById('estado_empresa').innerHTML = conteudo_estado

    document.getElementById('nome_empresa_input').classList.remove('vermei')
    document.getElementById('nome_fantasia_input').classList.remove('vermei')
    document.getElementById('cnpj_input').classList.remove('vermei')
    document.getElementById('ramo_input').classList.remove('vermei')
    document.getElementById('cep_empresa_input').classList.remove('vermei')
    document.getElementById('numero_empresa_input').classList.remove('vermei')

    alternar_edicao_empresa()
}

function editar_empresa(){

    alternar_edicao_empresa()

    document.getElementById('nome_empresa_input').placeholder = conteudo_nome_empresa
    document.getElementById('nome_fantasia_input').placeholder = conteudo_nome_fantasia
    document.getElementById('cnpj_input').placeholder = conteudo_cnpj
    document.getElementById('ramo_input').placeholder = conteudo_ramo
    document.getElementById('cep_empresa_input').placeholder = conteudo_cep
    document.getElementById('numero_empresa_input').placeholder = conteudo_numero
}

function salvar_usuario(){
    document.querySelectorAll('.adicional').forEach((item)=>{
        item.classList.remove('vermei')
    })
    document.getElementById("tel_input").classList.remove('vermei')
    let tel = document.getElementById('tel_input').value
    let email = document.getElementById('email_input').value
    let adicional = false
    let valido = false

    if(email != '' && tel == ''){
        document.getElementById("dados_usuario").submit();
        return
    }
    var tels = 0
    document.querySelectorAll('.adicional').forEach((item)=>{

        tels ++
        Cookies.set(item.getAttribute('name'), item.value)

        if (item){
            adicional = true
        } else {
            adicional = false
        }
    });

    if (tel == '' && email == '' && !adicional){
            abrirjanela('blue','Dados não preenchidos<br> Cancelando alteração...','Dados Inexistentes')
            document.getElementById('cancelar').click()
            return
        }

    if (tel.length < 15 && !adicional){
        abrirjanela('red','Telefone incompleto, por favor verifique-o!','Dados incompletos')
        document.getElementById("tel_input").classList.add('vermei')
        return
    } else {
        valido = true
    }

    if(adicional){
        document.querySelectorAll('.adicional').forEach((item)=>{
            if (item.value.length == 15){
                valido = true
            } else {
                valido = false
                item.classList.add('vermei')
                return
            }
    })}

    if(valido){
        document.getElementById("dados_usuario").submit();
        Cookies.set('tels',tels)
    } else {
        abrirjanela('red','Telefone adicional incompleto<br> Por favor verifique-o ou exclua-o!','Dados incompletos')
    }
}

function salvar_empresa(){
    let nome_empresa = document.getElementById('nome_empresa_input')
    let nome_fantasia = document.getElementById('nome_fantasia_input')
    let cnpj = document.getElementById('cnpj_input')

    nome_empresa.classList.remove('vermei')
    nome_fantasia.classList.remove('vermei')
    cnpj.classList.remove('vermei')

    if(nome_empresa.value == conteudo_nome_empresa){
        nome_empresa.classList.add('vermei')
        abrirjanela('red','Nome para empresa já utilizado!<br>Se não deseja alterá-lo apenas deixe em branco.<br>Senão, verifique a escrita.','Alteração Inválida')
        return
    }
    if (nome_fantasia.value == conteudo_nome_fantasia){
        nome_fantasia.classList.add('vermei')
        abrirjanela('red','Nome Fantasia já utilizado!<br>Se não deseja alterá-lo apenas deixe em branco.<br>Senão, verifique a escrita.','Alteração Inválida')
        return
    } else {
        abrirjanela('blue','Verificando dados...','Atualização de Dados')

        Cookies.set('cnpj', cnpj.value)
        Cookies.set('nome_fantasia', nome_fantasia.value)
        Cookies.set('nome_empresa', nome_empresa.value)
        Cookies.set('empresa',1)
        document.getElementById("dados_empresa").submit()
    }

}