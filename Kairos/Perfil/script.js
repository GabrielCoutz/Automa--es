window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function fechar_pop() {
    document.getElementById("dados_empresa").submit()
}

function nada(){
    document.getElementById('asdf_cancelar').click()
}


const conteudo_rua = document.getElementById('rua_empresa').innerText
const conteudo_bairro = document.getElementById('bairro_empresa').innerText
const conteudo_estado = document.getElementById('estado_empresa').innerText
const conteudo_cidade = document.getElementById('cidade_empresa').innerText

const conteudo_nome_empresa = document.getElementById('nome_empresa').innerText
const conteudo_nome_fantasia = document.getElementById('nome_fantasia').innerText
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
        if(document.getElementById('del_tel').style.display != 'none'){
            $('#del_tel').toggle();
        };
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
        
    $('.btn-del-phone').click(function(){
        var pos = 1
        $('.btn-add-phone').toggle();
        $('.btn-del-phone').toggle();
        while(document.getElementById('tel').innerText.split('(')[pos] != undefined){
            $('.phone-list').append(''+
            '<div class="exclusao_tel">'+
                '<div class="del_num" id="del_tel'+pos+'" name="del_tel'+pos+'">'+'('+document.getElementById('tel').innerText.split('(')[pos]+'</div>'+
                    '<span class="input-group-btn">'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button" onclick="deletar_tel(this)" id="del_telbtn'+pos+'"><span class="lnr lnr-cross"></span></button>'+
                    '</span>'+ '<br>'+
            '</div>'
        
        );
        pos += 1
        }
        
    });

});

function deletar_tel(tel){
    let elemento = document.getElementById(tel.id.replace('btn',''))
    if(elemento.style.opacity != '0.5'){
        elemento.style.opacity = '0.5'
    } else {
        elemento.style.opacity = '1'
    }

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
// -------------------- fim código popup --------------------

var alerta = ""

document.getElementById("email_input").classList.remove('vermei')

if (window.location.href.includes(md5('email_duplicado=true'))) {
    document.getElementById("email_input").classList.add('vermei')
    document.getElementById('editar').click()
    abrirjanela('red','Email já cadastrado!<br>', '| Alteração Inválida |')
    
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

if (window.location.href.includes(md5('senha=false'))) { // senha erro
    abrirjanela('red','Não foi possível alterar sua senha!<br>Por favor, verifique os campos e tente novamente.', '| Alteração Inválida |')
    
    document.getElementById('editarsenha').click()
    document.getElementById("senha_antiga").classList.add('vermei')
    document.getElementById("senha_nova").classList.add('vermei')
    document.getElementById("senha_nova_dup").classList.add('vermei')
    
    let nextURL = window.location.href.replace(md5('senha=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

if (window.location.href.includes(md5('erro=true'))) { // erro de login
    abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada')
    document.getElementsByClassName('container')[0].style.display = 'none'
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(nada , 3000)
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
            window.location.href = "../Login/index.php"
        })
    
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);

}


if(alerta != ""){
    abrirjanela('red',alerta, '| Alteração Inválida |')
    document.getElementById('editar_empresabtn').click()

} else if(window.location.href.includes(md5('livre=true'))){
    abrirjanela('green','Dados alterados com êxito.', '| Alteração realizada com sucesso |')

    let nextURL = window.location.href.replace(md5('livre=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}


$('select').on('change', function() {
    if (this.value == "") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();

function mudar_senha(botao,elemento){
    let togglePassword = document.querySelector('#'+botao);
    let password = document.querySelector('#'+elemento);

  togglePassword.addEventListener('click', function (e) {
    let type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('bi-eye');
});
}

mudar_senha('togglePassword_antigo','senha_antiga')
mudar_senha('togglePassword_novo','senha_nova')
mudar_senha('togglePassword_novo_dup','senha_nova_dup')

$("#cep_empresa_input").focusout(function(){
$.ajax({
    url: 'https://viacep.com.br/ws/'+$(this).val().toString().replace(/-/, '').replace('.', '')+'/json/unicode/',
    dataType: 'json',
    success: function(resposta){
        if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
            abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','| Alteração Inválida |')
            document.getElementById('cep_empresa_input').classList.add('vermei')
            document.getElementById('cep_empresa_input').focus()
            document.getElementById('cep_empresa_input').placeholder = document.getElementById('cep_empresa_input').value
            document.getElementById('cep_empresa_input').value = ''
            return
            
        } else {
            document.getElementById('cep_empresa_input').classList.remove('vermei')
            document.getElementById('rua_empresa').innerHTML = resposta.logradouro
            document.getElementById('bairro_empresa').innerHTML = resposta.bairro
            document.getElementById('cidade_empresa').innerHTML = resposta.localidade
            document.getElementById('estado_empresa').innerHTML = resposta.uf
            document.getElementById('numero_empresa_input').focus()
        }
    }
});
});

function vazio_senha(){
    let senha_antiga = document.getElementById('senha_antiga').value
    let senha_nova = document.getElementById('senha_nova').value
    let senha_nova_dup = document.getElementById('senha_nova_dup').value

    if(senha_antiga == '' || senha_nova == '' || senha_nova_dup == ''){
        document.getElementById("salvar_senhabtn").disabled = true;
    } else {
        document.getElementById("salvar_senhabtn").disabled = false;
    }
}

function editar_senha(){
    $("#pass").toggle();
    $("#editarsenha").toggle();
    $("#pass2").toggle();
    $("#pass3").toggle();

    document.getElementById('pass').style.display = 'grid'
    document.getElementById('pass2').style.display = 'grid'
    document.getElementById('pass3').style.display = 'grid'

    $("#editar").toggle();
    $("#salvar_senhabtn").toggle();
    $("#cancelar_senhabtn").toggle();

    document.getElementById("salvar_senhabtn").disabled = true;
    document.getElementsByClassName('senha')[0].innerText = 'Alterar Senha'

}

function vazio_empresa(){
    let cep = document.getElementById('cep_empresa_input').value
    let num = document.getElementById('numero_empresa_input').value
    
    if(cep == '' || num == ''){
        document.getElementById('salvar_empresabtn').disabled = true
    } else {
        document.getElementById('salvar_empresabtn').disabled = false
    }
}

function salvar_senha(){
    let senha_nova = document.getElementById('senha_nova')
    let senha_nova_dup = document.getElementById('senha_nova_dup')

    senha_nova.classList.remove('vermei')
    senha_nova_dup.classList.remove('vermei')

    if(senha_nova.value != senha_nova_dup.value){
        senha_nova.classList.add('vermei')
        senha_nova_dup.classList.add('vermei')
        alert('Senhas não coincidem')
    } else {
        Cookies.set('senha',1)
        document.getElementById("dados_usuario").submit();
    }
}

function cancelar_senha(){
    $("#editar").toggle();
    $("#editarsenha").toggle();
    $("#salvar_senhabtn").toggle();
    $("#cancelar_senhabtn").toggle();

    document.getElementById('pass').style.display = 'none'
    document.getElementById('pass2').style.display = 'none'
    document.getElementById('pass3').style.display = 'none'

    document.getElementsByClassName('senha')[0].innerText = 'Senha'

    senha_antiga = document.getElementById('senha_antiga').value = ''
    senha_nova = document.getElementById('senha_nova').value = ''
    senha_nova_dup = document.getElementById('senha_nova_dup').value = ''

}

function alternar_edicao(){
    $("#add_tel").toggle();
    $("#del_tel").toggle();
    $("#email_input").toggle();

    document.getElementsByClassName('phone-list')[0].style.display = 'inline'

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
    localStorage.clear()
}

function editar_usuario(){
    let conteudo_email = document.getElementById('email').innerText

    document.getElementById("editarsenha").disabled = true;

    document.getElementById('senha_antiga').value=''
    document.getElementById('senha_nova').value=''
    document.getElementById('senha_nova_dup').value=''

    alternar_edicao()

    document.getElementById('email_input').placeholder = conteudo_email

}

function cancelar_usuario(){
    document.getElementById('email_input').value = ''
    $('.adicional').closest('.phone-input').remove();
    $('.exclusao_tel').remove();
    document.getElementById("editarsenha").disabled = false;

    alternar_edicao()
    document.getElementsByClassName('phone-list')[0].style.display = 'none'
    if(document.getElementById('add_tel').style.display != 'none'){
        document.getElementById('add_tel').style.display = 'none'
    }

    document.getElementById('pass').style.display = 'none'
    document.getElementById('pass2').style.display = 'none'
    document.getElementById('pass3').style.display = 'none'

    $('#senha_antiga').value = ''
    $('#senha_nova').value = ''
    $('#senha_nova_dup').value = ''
    document.getElementById('del_tel').style.display = 'none'
    let pos = 1
    while(document.getElementById('del_tel'+pos)){
        $('#del_telbtn'+pos).remove();
        document.getElementById('del_tel'+pos).remove()
        pos++
    }
}

function cancelar_empresa(){
    document.getElementById('nome_fantasia_input').value = ''
    document.getElementById('nome_empresa_input').value = ''
    document.getElementById('ramo_input').value = ''
    document.getElementById('cep_empresa_input').value = ''
    document.getElementById('numero_empresa_input').value = ''
    document.getElementById('rua_empresa').innerHTML = conteudo_rua
    document.getElementById('bairro_empresa').innerHTML = conteudo_bairro
    document.getElementById('cidade_empresa').innerHTML = conteudo_cidade
    document.getElementById('estado_empresa').innerHTML = conteudo_estado

    document.getElementById('nome_empresa_input').classList.remove('vermei')
    document.getElementById('nome_fantasia_input').classList.remove('vermei')
    document.getElementById('ramo_input').classList.remove('vermei')
    document.getElementById('cep_empresa_input').classList.remove('vermei')
    document.getElementById('numero_empresa_input').classList.remove('vermei')

    document.getElementById('salvar_empresabtn').disabled = false

    alternar_edicao_empresa()
}

function editar_empresa(){

    alternar_edicao_empresa()
    document.getElementById('nome_empresa_input').placeholder = conteudo_nome_empresa
    document.getElementById('nome_fantasia_input').placeholder = conteudo_nome_fantasia
    $('#ramo_input').val(conteudo_ramo); 
    $('#ramo_input').change();
    document.getElementById('cep_empresa_input').placeholder = conteudo_cep
    document.getElementById('numero_empresa_input').placeholder = conteudo_numero
}

function salvar_usuario(){
    let numeros = []
    if (document.getElementsByClassName('exclusao_tel')[0] != undefined){
        let pos = 1
        while(document.getElementById('del_tel'+pos) != undefined){
            if (document.getElementById('del_tel'+pos).style.opacity == '0.5'){
                numeros.push(document.getElementById('del_tel'+pos).innerText)
            }
        pos ++
        }
    Cookies.set('excluir_num',1)
    Cookies.set('excluir_nums',numeros.length)
    let a = 1
    numeros.forEach((item)=>{
        Cookies.set('del_num'+a,item)
        a++
    });
    abrirjanela('blue','Verificando dados...','Validando Alteração')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
        document.getElementById('asdf_cancelar').addEventListener('click', function(){
            document.getElementById("dados_usuario").submit();
        })
    
    }
    document.getElementById("editarsenha").disabled = false;
    document.querySelectorAll('.adicional').forEach((item)=>{
        item.classList.remove('vermei')
    })
    let email = document.getElementById('email_input').value
    let adicional = false
    let valido = false

    if(email != ''){
        document.getElementById("dados_usuario").submit();
        Cookies.set('usuario',1)
        return
    }
    var tels = 0
    document.querySelectorAll('.adicional').forEach((item)=>{
        tels ++
        Cookies.set(item.getAttribute('name'), item.value)
        Cookies.set('usuario',1)

        if (item){
            adicional = true
        }
    });

    if (email == '' && !adicional && document.getElementsByClassName('exclusao_tel')[0] == undefined){
        abrirjanela('blue','<br>Dados não preenchidos<br> Cancelando alteração...','Dados Inexistentes')
        document.getElementById('cancelar').click()
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 1500)
            return
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
        abrirjanela('blue','Verificando dados...','Validando Alteração')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
        document.getElementById('asdf_cancelar').addEventListener('click', function(){
            document.getElementById("dados_usuario").submit();
        })

        Cookies.set('usuario',1)
        Cookies.set('tels',tels)
    } else {
        abrirjanela('red','Telefone adicional incompleto<br> Por favor verifique-o ou exclua-o!','Dados incompletos')
    }
}

function salvar_empresa(){
    let nome_empresa = document.getElementById('nome_empresa_input')
    let nome_fantasia = document.getElementById('nome_fantasia_input')
    let ramo = document.getElementById('ramo_input')
    let cep_empresa = document.getElementById('cep_empresa_input').value
    let numero_empresa = document.getElementById('numero_empresa_input').value

    nome_empresa.classList.remove('vermei')
    nome_fantasia.classList.remove('vermei')

    if (ramo.value != conteudo_ramo && ramo.value != undefined){
        Cookies.set('ramo',ramo.value)
    }

    if(nome_empresa.value == conteudo_nome_empresa){
        nome_empresa.classList.add('vermei')
        abrirjanela('red','Nome para empresa já utilizado!<br>Se não deseja alterá-lo apenas deixe em branco.<br>Senão, verifique a escrita.','Alteração Inválida')
        return
    }
    if (nome_fantasia.value == conteudo_nome_fantasia){
        nome_fantasia.classList.add('vermei')
        abrirjanela('red','Nome Fantasia já utilizado!<br>Se não deseja alterá-lo apenas deixe em branco.<br>Senão, verifique a escrita.','Alteração Inválida')
        return
    }
    if (nome_fantasia.value == '' && nome_empresa.value == '' && cep_empresa == '' && numero_empresa == '' && ramo.value == conteudo_ramo){
        abrirjanela('blue','<br>Dados não preenchidos<br> Cancelando alteração...','Dados Inexistentes')
        document.getElementById('cancelar_empresabtn').click()
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 1500)
        return

    } else {

        abrirjanela('blue','<br>Verificando dados...','Atualização de Dados')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(fechar_pop, 1500)

        Cookies.set('empresa',1)
        
        if (cep_empresa != '' || numero_empresa != ''){
            Cookies.set('endereco_empresa',1)
            Cookies.set('cep_empresa',document.getElementById('cep_empresa_input').value)
            Cookies.set('numero_empresa',document.getElementById('numero_empresa_input').value)
            Cookies.set('rua_empresa',document.getElementById('rua_empresa').innerText)
            Cookies.set('bairro_empresa',document.getElementById('bairro_empresa').innerText)
            Cookies.set('cidade_empresa',document.getElementById('cidade_empresa').innerText)
            Cookies.set('estado_empresa',document.getElementById('estado_empresa').innerText)
        }
    }
}