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