window.onload = function () { // animação de loader inicial
    window.setTimeout(fadeout, 500);
}

function fadeout() { // animação de loader inicial/2
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const nome = document.getElementById('nome')
const cep = document.getElementById('cep')
const numero = document.getElementById('numero')
const endereco = document.getElementById('endereco')
const senha_antiga = document.getElementById('senha_antiga')
const senha_nova = document.getElementById('senha_nova')
const senha_nova_dup = document.getElementById('senha_nova_dup')

const conteudo_nome = document.getElementById('nome').value
const conteudo_cep = document.getElementById('cep').value
const conteudo_numero = document.getElementById('numero').value
const conteudo_endereco = document.getElementById('endereco').innerText

const salvarbtn = document.getElementById('salvarbtn')
const cancelarbtn = document.getElementById('cancelarbtn')

$(document).ready(function(){
    if(vazio(cep.value)){
        cep.placeholder = '00.000-000'
        endereco.innerHTML = 'Não cadastrado'
    }

    if (vazio(numero.value)){
        numero.placeholder = 'Não cadastrado'
    }
});


const verSenhaAntiga = function () {
    let elemento = document.getElementById('togglePassword_antigo')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('gg-eye')
    elemento.classList.toggle('gg-eye-alt')
}

const verSenhaAntigaNovo = function () {
    let elemento = document.getElementById('togglePassword_novo')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('gg-eye')
    elemento.classList.toggle('gg-eye-alt')
}

const verSenhaAntigaNovoDup = function () {
    let elemento = document.getElementById('togglePassword_novo_dup')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('gg-eye')
    elemento.classList.toggle('gg-eye-alt')
}

function nada(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        document.getElementById("dados").submit();
    })
    document.getElementById('asdf_cancelar').click()
}

function erro(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        window.location.href = "../Login/login"
    })
    document.getElementById('asdf_cancelar').click()
}

const limpar_inputs = function(){
    document.querySelectorAll('input').forEach(element => {
        element.classList.remove('vermei')
    });

    limpar_alertas()
}

const limpar_alertas = function(){
    document.querySelectorAll('.alerta').forEach(element => {
        if (!element.classList.contains('none')){
            element.classList.toggle('none')
        }
    });
}

function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
}

$(document).keypress( // desativa a tecla Enter
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

switch (true) {
    case window.location.href.includes(md5('erro=true')):
        abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada','falha')
        document.getElementsByClassName('content')[0].style.display = 'none'
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(erro , 3000)
        limparURL(md5('erro=true'))
        break;

    case window.location.href.includes(md5('senha=false')): // senha diferente da já utilizada
        abrirjanela('red','Não foi possível alterar sua senha!<br>Por favor, verifique os campos e tente novamente.', 'Alteração Inválida', 'falha')
        limparURL(md5('senha=false'))
        document.getElementById('editarsenha').click()
        document.getElementById("senha_antiga").classList.add('vermei')
        document.getElementById("senha_nova").classList.add('vermei')
        document.getElementById("senha_nova_dup").classList.add('vermei')
        break;

    case window.location.href.includes(md5('sucesso=true')):
        abrirjanela('green','Dados alterados com êxito.', 'Alteração realizada', 'sucesso')
        limparURL(md5('sucesso=true'))
        break;

    case window.location.href.includes(md5('sucesso=false')):
        abrirjanela('red','Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.', 'Erro inesperado', 'falha')
        limparURL(md5('sucesso=false'))
        break;

    case window.location.href.includes(md5('analise=false')):
        abrirJanelaMarketing()
        limparURL(md5('analise=false'))
        break;
}

function verificarTelefone(input){
    if(input.value.length == 15){
        input.classList.remove('vermei')
        salvarbtn.disabled = false
    } else {
        input.classList.add('vermei')
        salvarbtn.disabled = true
    }
}

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', function(){
        switch (this.id) {
            
            case 'nome':
                console.log('nome')
                switch (true) {
                    case this.value == conteudo_nome:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    case this.value.length < 4:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'O nome deve ter no mínimo 4 letras!')
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;

            case 'cep':
                console.log('cep')
                switch (true) {
                    case this.value == conteudo_cep:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    case this.value.length < 10:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'Complete o CEP!')
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;

            case 'numero':
                console.log('numero')
                switch (true) {
                    case this.value == conteudo_numero:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    case vazio(this.value):
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'Preencha o número!')
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;
        }
    })
  })

function verificar_input(){ // se ouver entrada nos inputs, o botão de salvar é liberado

    let lista = document.getElementsByClassName('adicional')
    let tel_input = false

    for(let i = 0; i < lista.length; i++){ // impede que o usuário salve o telefone adicionado sem que o mesmo esteja completo, com 15 dígitos
        if (lista[i].value.length < 15){
            tel_input = false
            lista[i].classList.add('vermei')
            document.getElementById('salvarbtn').disabled = true
            break;

        } else {
            document.getElementById('salvarbtn').disabled = false
            lista[i].classList.remove('vermei')
            tel_input = true
        }
    }

    let deletar = false
    let ranks = document.getElementsByClassName('del_num')

    if(document.getElementsByClassName('exclusao_tel')[0]){
        for(let i = 0; i < ranks.length; i++) {
            if (ranks[i].style.opacity == '0.5'){
                deletar = true
            }
        };
    }
}

function ler_cep(cep){ // preenche o endereço automaticamente do usuario usando o cep
    if(cep.value.length == 10){
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    alertaDeErro(cep.id, 'CEP inválido!')
                    cep.focus()
                    salvarbtn.disabled = true
                    cancelarbtn.disabled = false
                    return
                } else if (cep.value != conteudo_cep){
                    Cookies.set('endereco',1)
                    document.getElementsByName('rua')[0].value = resposta.logradouro
                    document.getElementsByName('bairro')[0].value = resposta.bairro
                    document.getElementsByName('cidade')[0].value = resposta.localidade
                    document.getElementsByName('estado')[0].value = resposta.uf
                    document.getElementById('endereco').innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero.focus()
                }
                limpar_inputs()
            }
        })
    }
}

function removerTelefoneAdicional(elemento){
    elemento.closest('.phone-input').remove()
}

$(function(){ // código para adicionar/remover números de telefone
    
    $('.btn-add-phone').click(function(){
        cancelarbtn.disabled = false
        if(document.getElementById('del_tel').style.display != 'none'){
            $('#del_tel').toggle();
        };
        if(document.getElementById('tel').style.display != 'none'){
            $('#tel').toggle();
        };

        var index = $('.phone-input').length;
        var num = "'(00) 0000-00009'"
        $('.phone-list').append(''+
                '<div class="input-group phone-input">'+
                    '<input type="tel" name="phone'+index+'number" placeholder="(00) 0000-00000" class="adicional" onkeypress="$(this).mask('+num+')"/ onkeyup="verificarTelefone(this)">'+
                    '<span class="input-group-btn" >'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button" onclick="removerTelefoneAdicional(this)"><i class="gg-remove remove"></button>'+
                    '</span>'+
                '</div>'
        );

    });
        
    $('.btn-del-phone').click(function(){
        cancelarbtn.disabled = false
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
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button" onclick="deletar_tel(this)" id="del_telbtn'+pos+'"><i class="gg-remove remove"></i></button>'+'</div>'+
                    '</span>'+ '<br>'+
            '</div>'
        
        );
        pos += 1
        }
        
    });

});


// -------------------- início validador de senha --------------------

var timeout;
let strengthBadge = document.getElementById('StrengthDisp')
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const verificarSenha = function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(senha_nova.value), 500);
}

function StrengthChecker(PasswordParameter){

    if (vazio(PasswordParameter)){
        strengthBadge.classList.add('none')
        return
    } else {
        strengthBadge.classList.remove('none')
        strengthBadge.style.display = 'flex'
    }

    if (PasswordParameter.length < 10){
        strengthBadge.style.color="red"
        strengthBadge.textContent = 'Senha muito curta'

    } else if (strongPassword.test(PasswordParameter)) {
        strengthBadge.style.color="green"
        strengthBadge.textContent = 'Senha Forte'

    } else if (mediumPassword.test(PasswordParameter)){
        strengthBadge.style.color="#b6bf31";
        strengthBadge.textContent = 'Senha Mediana'

    } else {
        strengthBadge.style.color="red"
        strengthBadge.textContent = 'Senha Fraca'
    }
}

// -------------------- fim validador de senha --------------------
function deletar_tel(tel){
    let elemento = document.getElementById(tel.id.replace('btn',''))
    if(elemento.style.opacity != '0.5'){
        elemento.style.opacity = '0.5'
        salvarbtn.disabled = false
    } else {
        elemento.style.opacity = '1'
        salvarbtn.disabled = true
    }
}

function alertaDeErro(elemento, mensagem){
    if(!document.getElementById(elemento).classList.contains('vermei')){
        document.getElementById(elemento).classList.add('vermei')
        document.getElementById(elemento+'Alert').innerHTML = mensagem
        document.getElementById(elemento+'Alert').classList.toggle('none')
    }
}

function apenasLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
    if(event.value != undefined){
        let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
        event.value = limpo.replace('-','').replace('_','')
    }
}

function alterar_edicao(){
    let verificarSenha2 = function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => StrengthChecker(senha_nova.value), 500);
    }

    document.getElementById("editarsenha").classList.toggle("none")
    document.getElementById("salvar_senhabtn").classList.toggle("none")
    document.getElementById("cancelar_senhabtn").classList.toggle("none")

    document.getElementById("pass").classList.toggle("none");
    document.getElementById("pass2").classList.toggle("none");
    document.getElementById("pass3").classList.toggle("none");

    salvarbtn.classList.add('none')
    cancelarbtn.classList.add('none')

    document.getElementById('togglePassword_antigo').addEventListener('click', verSenhaAntiga)
    document.getElementById('togglePassword_novo').addEventListener('click', verSenhaAntigaNovo)
    document.getElementById('togglePassword_novo_dup').addEventListener('click', verSenhaAntigaNovoDup)

    document.getElementsByClassName('senha')[0].innerText = 'Senha'

    nome.disabled = true
    cep.disabled = true
    numero.disabled = true
    document.getElementById('add_tel').disabled = true
    document.getElementById('del_tel').disabled = true

    senha_antiga.value = ''
    senha_nova.value = ''
    senha_nova_dup.value = ''

    limpar_inputs()

    senha_nova.addEventListener("keyup", verificarSenha2)

}

function apagarCookie(nome){
    document.cookie = nome+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function cancelar(item){
    limpar_alertas()
    if(item.id == 'cancelar_senhabtn'){
        alterar_edicao()
        let verificarSenha2 = function(){
            clearTimeout(timeout);
            timeout = setTimeout(() => StrengthChecker(senha_nova.value), 500);
        }

        document.getElementById('togglePassword_antigo').removeEventListener('click', verSenhaAntiga)
        document.getElementById('togglePassword_novo').removeEventListener('click', verSenhaAntigaNovo)
        document.getElementById('togglePassword_novo_dup').removeEventListener('click', verSenhaAntigaNovoDup)

        senha_nova.removeEventListener("keyup", verificarSenha2)
        strengthBadge.classList.add('none')

        document.getElementById('cancelar_senhabtn').classList.add('none')
        document.getElementById('salvar_senhabtn').classList.add('none')
        salvarbtn.classList.remove('none')
        cancelarbtn.classList.remove('none')

        nome.disabled = false
        cep.disabled = false
        numero.disabled = false
        document.getElementById('add_tel').disabled = false
        document.getElementById('del_tel').disabled = false
        apagarCookie('senha')

        return
    }
    limpar_inputs()

    $('.adicional').closest('.phone-input').remove();
    $('.exclusao_tel').remove();

    if(document.getElementById('tel').style.display == 'none'){
        $('#tel').toggle();
    }
    endereco.innerHTML = vazio(conteudo_endereco.replace(', , ,','')) ? 'Não Cadastrado' : endereco.innerText
    nome.value = conteudo_nome
    cep.value = conteudo_cep
    numero.value = conteudo_numero

    salvarbtn.disabled = true
    cancelarbtn.disabled = true
    document.getElementById('del_tel').style.display = 'inline-block'
    document.getElementById('add_tel').style.display = 'inline-block'
    apagarCookie('endereco')
    apagarCookie('excluir_num')
    apagarCookie('tels')
}

function salvar(item){
    if (item.id == 'salvar_senhabtn'){
        limpar_inputs()

        if(vazio(senha_antiga.value) || vazio(senha_nova.value) || vazio(senha_nova_dup.value) || senha_nova.value != senha_nova_dup.value){
            senha_nova.classList.add('vermei')
            senha_nova_dup.classList.add('vermei')
            alertaDeErro(senha_antiga.id, 'Por favor, verifique os campos e tente novamente!')

        } else {
            abrirjanela('blue', 'Verificando dados', 'Validando Alteração', 'carregar')
            Cookies.set('senha', 1)
            document.getElementById('asdf_cancelar').style.display = 'none'
            setTimeout(nada, 3000)
            console.log('tudo certo')
        }
        return
    }

    limpar_inputs()

    let numeros = []

    if (document.getElementsByClassName('exclusao_tel')[0] != undefined){ // se existirem números a serem excluídos, cada um selecionado vai para lista de Cookies, usada como lista de exclusão

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
        })
    }

    var tels = 0
    if(document.querySelectorAll('.adicional')[0]){
        document.querySelectorAll('.adicional').forEach((item)=>{ // se existirem números a serem adicionados, são guardados nos Cookies, usados como lista de adição
            item.classList.remove('vermei')
            tels ++
            Cookies.set(item.getAttribute('name'), item.value)
            Cookies.set('usuario',1)
    
        });
        Cookies.set('usuario',1)
        Cookies.set('tels',tels)
    }

    if (!vazio(cep.value) && cep.value.length <= 10 && vazio(numero.value)){
        alertaDeErro(cep.id, 'Complete o endereço!')
        cep.classList.add('vermei')
        numero.classList.add('vermei')

    } else {
        Cookies.set('usuario',1)
        abrirjanela('blue','Verificando dados','Validando Alteração', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 2000)
    }
}

function sair(){
    localStorage.clear()
    window.location.href= '../index'
}

function fechar_menu(){
    document.getElementsByTagName('html')[0].classList.remove('nav-open')
    document.getElementsByClassName('close-layer')[0].classList.add('none')
}

function abrir_menu(){
    document.getElementsByTagName('html')[0].classList.add('nav-open')
}