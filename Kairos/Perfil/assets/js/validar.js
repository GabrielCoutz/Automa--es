window.onload = function () { // animação de loader inicial
    window.setTimeout(fadeout, 500);
}

function fadeout() { // animação de loader inicial/2
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const nome_input = document.getElementById('nome_input')
const cep_input = document.getElementById('cep_input')
const numero_input = document.getElementById('numero_input')
const endereco = document.getElementById('endereco')

const conteudo_nome_input = document.getElementById('nome_input').value
const conteudo_cep_input = document.getElementById('cep_input').value
const conteudo_numero_input = document.getElementById('numero_input').value
const conteudo_endereco = document.getElementById('endereco').innerText

const salvarbtn = document.getElementById('salvarbtn')
const cancelarbtn = document.getElementById('cancelarbtn')

$(document).ready(function(){
    if(vazio(cep_input.value)){
        cep.value = '00.000-000'
        endereco.value = 'Não cadastrado'
    }

    if (vazio(numero_input.value)){
        numero.value = 'Não cadastrado'
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

if(vazio(document.getElementById('plano').innerText)){ // sem plano contratado
    document.getElementById('assinarbtn').classList.toggle('none')
}

function assinar(){
    window.location.href = "assets/php/enviar_usuario?assinar=true"
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
}

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', function(){
        switch (this.id) {
            case 'nome_input':
                console.log('nome')

                switch (true) {
                    case this.value == conteudo_nome_input:
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

            case 'cep_input':
                console.log('cep')
                switch (true) {
                    case this.value == conteudo_cep_input:
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

            case 'numero_input':
                console.log('numero')
                switch (true) {
                    case this.value == conteudo_numero_input:
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

function alteracao(evento){ // se houver erros no input o botão de salvar é desabilitado até que sejam resolvidos
    let livre = true
    let lista = document.getElementsByTagName('input')

    for (let index = 0; index < lista.length; index++) {
        if(lista[index].classList.toString().includes('vermei')){
            livre = false
            return
        } else{
            livre = true
        }
    };
    if(livre){
        document.addEventListener(evento, verificar_input)
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
                    cep_input.focus()
                    return
                } else if (cep.value != conteudo_cep_input){
                    Cookies.set('endereco',1)
                    document.getElementsByName('rua')[0].value = resposta.logradouro
                    document.getElementsByName('bairro')[0].value = resposta.bairro
                    document.getElementsByName('cidade')[0].value = resposta.localidade
                    document.getElementsByName('estado')[0].value = resposta.uf
                    document.getElementById('endereco').innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero_input.focus()
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
                    '<input type="tel" name="phone'+index+'number" placeholder="(00) 0000-00000" class="adicional" onkeypress="$(this).mask('+num+')"/>'+
                    '<span class="input-group-btn">'+
                        '<button class="btn btn-danger btn-remove-phone btn-info" type="button" onclick="removerTelefoneAdicional(this)"><i class="gg-remove remove"></button>'+
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
let password = document.getElementById('senha_nova')
let strengthBadge = document.getElementById('StrengthDisp')
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const verificarSenha = function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(password.value), 500);
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
    } else {
        elemento.style.opacity = '1'
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

function alterar_edicao(chave){
    if(chave == 'senha'){
        document.getElementById("editarsenha").classList.toggle("none");
        document.getElementById("salvar_senhabtn").classList.toggle("none");
        document.getElementById("cancelar_senhabtn").classList.toggle("none");

        document.getElementById("pass").classList.toggle("none");
        document.getElementById("pass2").classList.toggle("none");
        document.getElementById("pass3").classList.toggle("none");

        document.getElementsByClassName('senha')[0].innerText = 'Senha'

        document.getElementById('senha_antiga').value = ''
        document.getElementById('senha_nova').value = ''
        document.getElementById('senha_nova_dup').value = ''

        senha_antiga.classList.remove('vermei')
        senha_nova.classList.remove('vermei')
        senha_nova_dup.classList.remove('vermei')

        return
    }
}

function cancelar(item){
    limpar_alertas()
    if(item.id == 'cancelar_senhabtn'){
        alterar_edicao('senha')
        let verificarSenha2 = function(){
            clearTimeout(timeout);
            timeout = setTimeout(() => StrengthChecker(password.value), 500);
        }

        document.getElementById('togglePassword_antigo').removeEventListener('click', verSenhaAntiga)
        document.getElementById('togglePassword_novo').removeEventListener('click', verSenhaAntigaNovo)
        document.getElementById('togglePassword_novo_dup').removeEventListener('click', verSenhaAntigaNovoDup)

        password.removeEventListener("keyup", verificarSenha2)
        strengthBadge.classList.add('none')
        document.getElementById('divplano').classList.remove('none')

        return
    }
    limpar_inputs()
    document.getElementById('editarsenha').disabled = false

    //$('.adicional').closest('.phone-input').remove();
    //$('.exclusao_tel').remove();
//
    //if(document.getElementById('tel').style.display == 'none'){
    //    $('#tel').toggle();
    //}
    endereco.innerHTML = vazio(conteudo_endereco.replace(', , ,','')) ? 'Não Cadastrado' : endereco.innerText
    nome_input.value = conteudo_nome_input
    cep_input.value = conteudo_cep_input
    numero_input.value = conteudo_numero_input

    salvarbtn.disabled = true
    cancelarbtn.disabled = true
}

function salvar(item){
    if (item.id == 'salvar_senhabtn'){
        let senha_antiga = document.getElementById("senha_antiga")
        let senha_nova = document.getElementById("senha_nova")
        let senha_nova_dup = document.getElementById("senha_nova_dup")

        senha_antiga.classList.remove('vermei')
        senha_nova.classList.remove('vermei')
        senha_nova_dup.classList.remove('vermei')

        if(vazio(senha_antiga.value) || vazio(senha_nova.value) || vazio(senha_nova_dup.value) || senha_nova.value != senha_nova_dup.value){
            senha_antiga.classList.add('vermei')
            senha_nova.classList.add('vermei')
            senha_nova_dup.classList.add('vermei')
            alertaDeErro(senha_antiga.id, 'Por favor, verifique os campos e tente novamente!')

        } else {
            abrirjanela('blue','Verificando dados','Validando Alteração', 'carregar')
            Cookies.set('senha',1)
            document.getElementById('asdf_cancelar').style.display = 'none'
            setTimeout(nada , 3000)
        }
        return
    }

    limpar_inputs()

    let numeros = []
    let adicional = false
    let valido = false

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
    document.querySelectorAll('.adicional').forEach((item)=>{ // se existirem números a serem adicionados, são guardados nos Cookies, usados como lista de adição
        item.classList.remove('vermei')
        tels ++
        Cookies.set(item.getAttribute('name'), item.value)
        Cookies.set('usuario',1)

        if (item){
            adicional = true
        }
    });

    if(adicional){ // se houver números adicionais é verificado se todos estão preenchidos, senão é sinalizado com bordas vermelhas
        document.querySelectorAll('.adicional').forEach((item)=>{
            if (item.value.length == 15){
            } else {
                item.classList.add('vermei')
                return
            }
        });
        
        document.querySelectorAll('.adicional').forEach((element) => {// caso existam bordas vermelhas significa que há algum erro, então o usuário é alertado
            if(element.classList.toString().includes('vermei')){
                valido = false
                return
            } else {
                valido = true
            }
            
        });
    }

    if(!valido && adicional){
        abrirjanela('red','Telefone adicional incompleto<br> Por favor verifique-o ou remova-o!','Dados incompletos', 'falha')
        return
    } else {
        Cookies.set('usuario',1)
        Cookies.set('tels',tels)
    }

    if (!vazio(cep_input.value) && cep_input.value.length <= 10 && vazio(numero_input.value)){
        alertaDeErro(cep_input.id, 'Complete o endereço!')
        cep_input.classList.add('vermei')
        numero_input.classList.add('vermei')

    } else {
        Cookies.set('usuario',1)
        abrirjanela('blue','Verificando dados','Validando Alteração', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
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