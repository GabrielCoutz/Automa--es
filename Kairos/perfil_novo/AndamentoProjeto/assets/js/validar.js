const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cep = document.getElementById('cep')
const numero = document.getElementById('numero')

const nome_input = document.getElementById('nome_input')
const email_input = document.getElementById('email_input')
const cep_input = document.getElementById('cep_input')
const numero_input = document.getElementById('numero_input')

const conteudo_nome = document.getElementById('nome').innerText.trim()
const conteudo_email = document.getElementById('email').innerText.trim()
const conteudo_cep = document.getElementById('cep').innerText.trim()
const conteudo_numero = document.getElementById('numero').innerText.trim()

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

function nada(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        document.getElementById("dados").submit();
    })
    document.getElementById('asdf_cancelar').click()
}
// -------------------- fim código popup --------------------

function validarEmail(email){
    if (email != ''){
        return email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
    } else {
        return true
    }
}

function ler_cep(cep){ // preenche o endereço automaticamente do usuario usando o cep
    if(cep.value.length == 10){
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/unicode/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','| Alteração Inválida |')
                    cep_input.classList.add('vermei')
                    cep_input.focus()
                    cep_input.placeholder = cep.value
                    cep_input.value = ''
                    return
                    
                } else {
                    document.getElementById('endereco').innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero_input.focus()
                }
            }
        })
    }
}

function vazio(item){
    return item == ''
}

//telefone
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
        if(document.getElementById('tel').style.display != 'none'){
            $('#tel').toggle();
        };
        var index = $('.phone-input').length + 1;
        var num = "'(00) 0000-00009'"
        $('.phone-list').append(''+
                '<div class="input-group phone-input">'+
                    '<input type="tel" name="phone'+index+'number" placeholder="(00) 0000-00000" id="tel_input" class="adicional" onkeypress="$(this).mask('+num+')"/>'+
                    '<input type="hidden" name="phone['+index+'][type]" class="type-input"/>'+
                    '<span class="input-group-btn">'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button"><span class="lnr lnr-cross"></span></button>'+
                    '</span>'+
                '</div>'
        );

    });
        
    $('.btn-del-phone').click(function(){
        var pos = 1
        if(document.getElementById('tel').style.display != 'none'){
            $('#tel').toggle();
        };
        $('.btn-add-phone').toggle();
        $('.btn-del-phone').toggle();
        while(document.getElementById('tel').innerText.split('(')[pos] != undefined){
            $('.phone-list').append(''+
            '<div class="exclusao_tel">'+
                '<div class="del_num" id="del_tel'+pos+'" name="del_tel'+pos+'">'+'('+document.getElementById('tel').innerText.split('(')[pos].trim()+
                    '<span class="input-group-btn">'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button" onclick="deletar_tel(this)" id="del_telbtn'+pos+'"><span class="lnr lnr-cross"></span></button>'+'</div>'+
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

function alterar_edicao(){
    // esconde divs de conteúdo
    nome.classList.toggle("none")
    email.classList.toggle("none")
    cep.classList.toggle("none")
    numero.classList.toggle("none")

    //torna visível botões de edição
    document.getElementById('editarbtn').classList.add('none')
    document.getElementById('salvarbtn').classList.toggle('none')
    document.getElementById('cancelarbtn').classList.toggle('none')
    document.getElementById('botoes_tel').classList.toggle('none')

    
    // torna visível input para edição
    nome_input.classList.toggle("none")
    email_input.classList.toggle("none")
    cep_input.classList.toggle("none")
    numero_input.classList.toggle("none")

    if(document.getElementById('del_tel').style.display == 'none'){
        $('#del_tel').toggle();
    };
    if(document.getElementById('add_tel').style.display == 'none'){
        $('#add_tel').toggle();
    };
}

function editar(){
    alterar_edicao()

    // coloca o conteúdo em placeholder
    nome_input.placeholder = conteudo_nome
    email_input.placeholder = conteudo_email
    cep_input.placeholder = conteudo_cep
    numero_input.placeholder = conteudo_numero
}

function cancelar(){
    alterar_edicao()

    document.getElementById('editarbtn').classList.remove('none')

    $('.adicional').closest('.phone-input').remove();
    $('.exclusao_tel').remove();

    if(document.getElementById('tel').style.display == 'none'){
        $('#tel').toggle();
    }

    nome_input.value = ''
    email_input.value = ''
    cep_input.value = ''
    numero_input.value = ''
}

function salvar(){
    nome_input.classList.remove('vermei')
    email_input.classList.remove('vermei')
    cep_input.classList.remove('vermei')
    numero_input.classList.remove('vermei')

    if(!vazio(nome_input.value) && nome_input.value.match(/\d+/g)){
        alert('Por favor, insira um nome válido!')
        nome_input.classList.add('vermei')
        nome_input.focus()

    } else if (!validarEmail(email_input.value)){
        alert('Por favor, insira um email válido!')
        email_input.classList.add('vermei')
        email_input.focus()

    } else if (!vazio(cep_input.value) && cep_input.value.length <= 10 && vazio(numero_input.value)){
        alert('Por favor, complete o endereço!')
        cep_input.classList.add('vermei')
        cep_input.focus()
        numero_input.classList.add('vermei')
        numero_input.focus()

    } else {
        abrirjanela('blue','Verificando dados...','Validando Alteração')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
    }
}