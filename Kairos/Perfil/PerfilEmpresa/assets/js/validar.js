window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const nome_empresa = document.getElementById('nome_empresa')
const nome_fantasia = document.getElementById('nome_fantasia')
const ramo_empresa = document.getElementById('ramo')
const cep_empresa = document.getElementById('cep_empresa')
const numero_empresa = document.getElementById('numero_empresa')
const endereco_empresa = document.getElementById('endereco_empresa')

const nome_empresa_input = document.getElementById('nome_empresa_input')
const nome_fantasia_input = document.getElementById('nome_fantasia_input')
const ramo_input = document.getElementById('ramo_input')
const cep_empresa_input = document.getElementById('cep_empresa_input')
const numero_empresa_input = document.getElementById('numero_empresa_input')

const conteudo_nome_empresa = document.getElementById('nome_empresa').innerText.trim()
const conteudo_ramo = document.getElementById('ramo').innerText.trim()
const conteudo_nome_fantasia = document.getElementById('nome_fantasia').innerText.trim()
const conteudo_cep_empresa = document.getElementById('cep_empresa').innerText.trim()
const conteudo_numero_empresa = document.getElementById('numero_empresa').innerText.trim()
const conteudo_endereco = document.getElementById('endereco_empresa').innerText.trim()

const IniciarCadastroEmpresa = function(){
    let popup = function(){
        abrirjanela('blue','Tudo bem, redirecionando para página de cadastro','Empresa não encontrada', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "assets/php/enviar_empresa?cadastrar=true"
    }
    setTimeout(popup, 1500)
    setTimeout(redirecionar, 3000)
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

const cancelarCadastroEmpresa = function(){
    let popup = function(){
        abrirjanela('blue','Tudo bem, redirecionando para página do usuário','Empresa não encontrada', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "../usuario"
    }

    setTimeout(popup, 1500)

    setTimeout(redirecionar, 6000)
}

function abrirEmpresa(){
    janelaPopUp.abre( "asdf", "p" + " "  + 'blue' + ' ' + 'confirm',  'Empresa Não encontrada' , 'Parece que você não tem uma empresa cadastrada. Gostaria de cadastrá-la agora?')

    document.getElementById('asdf_enviar').innerHTML = 'Não, talvez mais tarde'
    document.getElementById('asdf_enviar').addEventListener('click', cancelarCadastroEmpresa)

    document.getElementById('asdf_cancelar').addEventListener('click', IniciarCadastroEmpresa)
    document.getElementById('asdf_cancelar').innerHTML = 'Sim, gostaria'
}

// -------------------- fim código popup --------------------

function erro(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        window.location.href = "../../Login/login"
    })
    document.getElementById('asdf_cancelar').click()
}

function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

let alerta = ''

switch (true) {
    case window.location.href.includes(md5('erro=true')):
        abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada', 'falha')
        document.getElementsByClassName('content')[0].style.display = 'none'
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(erro , 3000)
        limparURL(md5('erro=true'))
        break;
        
    case window.location.href.includes(md5('dados_empresa=false')):
        abrirEmpresa()
        limparURL(md5('dados_empresa=false'))
        break;

    case window.location.href.includes(md5('nome_empresa_duplicado=true')):
        document.getElementById('editarbtn').click()
        document.getElementById("nome_empresa_input").classList.add('vermei')
        alerta+='Nome para Empresa já cadastrado!<br>'
        limparURL(md5('nome_empresa_duplicado=true'))
        break;

    case window.location.href.includes(md5('nome_fantasia_duplicado=true')):
        document.getElementById('editarbtn').click()
        document.getElementById("nome_fantasia_input").classList.add('vermei')
        alerta+='Nome Fantasia já cadastrado!<br>'
        limparURL(md5('nome_fantasia_duplicado=true'))
        break;

    case window.location.href.includes(md5('sucesso=true')):
        abrirjanela('green','Dados alterados com êxito.', 'Alteração realizada com sucesso', 'sucesso')
        limparURL(md5('sucesso=true'))
        break;

    case window.location.href.includes(md5('cadastro=true')):
        abrirjanela('green','Dados registrados com êxito.', 'Cadastro realizado com sucesso', 'sucesso')
        limparURL(md5('cadastro=true'))
        break;

    case window.location.href.includes(md5('sucesso=false')):
        abrirjanela('red','Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.', 'Erro inesperado', 'falha')
        limparURL(md5('sucesso=false'))
        break;


}

if(!vazio(alerta)){
    abrirjanela('red',alerta, 'Alteração Inválida', 'falha')
}

$(document).keypress(
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
  });

function nada(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        document.getElementById("dados_empresa").submit();
    })
    document.getElementById('asdf_cancelar').click()
}

function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
}

$('select').on('change', function() {
    if (this.value == null) {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
}).change();

function ler_cep(cep){ // preenche o endereço automaticamente da empresa usando o cep
    if(cep.value.length == 10){
        let temp = cep.value
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','Alteração Inválida', 'falha')
                    cep_empresa_input.classList.add('vermei')
                    cep_empresa_input.focus()
                    cep_empresa_input.placeholder = temp
                    cep_empresa_input.value = ''
                    return
                    
                } else {
                    cep_empresa_input.classList.remove('vermei')
                    numero_empresa_input.classList.remove('vermei')
                    document.getElementsByName('rua_empresa_input')[0].value = resposta.logradouro
                    document.getElementsByName('bairro_empresa_input')[0].value = resposta.bairro
                    document.getElementsByName('cidade_empresa_input')[0].value = resposta.localidade
                    document.getElementsByName('estado_empresa_input')[0].value = resposta.uf
                    endereco_empresa.innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero_empresa_input.focus()
                    Cookies.set('endereco_empresa',1)
                }
            }
        })
    }
}

function verificar_input(){

    if (vazio(nome_empresa_input.value) && vazio(nome_fantasia_input.value) && cep_empresa_input.value.length != 10 && vazio(numero_empresa_input.value) && ramo_input.value == conteudo_ramo){
        document.getElementById('salvarbtn').disabled = true

    } else {
        document.getElementById('salvarbtn').disabled = false
    }
}

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
}

document.getElementById('editarbtn').addEventListener('click',function(){ // libera eventelistener para ver alterações de inputs

    document.addEventListener('click', verificar_input)
    document.addEventListener('keyup', verificar_input)
})

function alterar_edicao(){
    //remove sinalização de erros
    nome_empresa_input.classList.remove('vermei')
    nome_fantasia_input.classList.remove('vermei')
    cep_empresa_input.classList.remove('vermei')
    numero_empresa_input.classList.remove('vermei')

    // esconde divs de conteúdo
    nome_empresa.classList.toggle("none")
    nome_fantasia.classList.toggle("none")
    cep_empresa.classList.toggle("none")
    numero_empresa.classList.toggle("none")

    //torna visível botões de edição
    document.getElementById('editarbtn').classList.add('none')
    document.getElementById('salvarbtn').classList.toggle('none')
    document.getElementById('salvarbtn').disabled = true
    document.getElementById('cancelarbtn').classList.toggle('none')

    // torna visível input para edição
    nome_empresa_input.classList.toggle("none")
    ramo.classList.toggle("none")
    ramo_input.classList.toggle("none")
    nome_fantasia_input.classList.toggle("none")
    cep_empresa_input.classList.toggle("none")
    numero_empresa_input.classList.toggle("none")
}

function editar(){
    alterar_edicao()

    // coloca o conteúdo em placeholder
    nome_empresa_input.placeholder = conteudo_nome_empresa
    nome_fantasia_input.placeholder = conteudo_nome_fantasia
    cep_empresa_input.placeholder = conteudo_cep_empresa
    numero_empresa_input.placeholder = conteudo_numero_empresa
    ramo_input.value = conteudo_ramo
}

function cancelar(){
    limpar_alertas()
    alterar_edicao()

    document.removeEventListener('click', verificar_input)
    document.removeEventListener('keyup', verificar_input)

    document.getElementById('editarbtn').classList.remove('none')

    nome_empresa_input.value = ''
    nome_fantasia_input.value = ''
    cep_empresa_input.value = ''
    numero_empresa_input.value = ''
    ramo_input.value = conteudo_ramo
    endereco_empresa.innerHTML = conteudo_endereco
}

function salvar(){
    limpar_inputs()
    if(!vazio(cep_empresa_input.value) && cep_empresa_input.value.length <= 10 && vazio(numero_empresa_input.value)){
        alertaDeErro(cep_empresa_input.id, 'Complete o endereço!')
        cep_empresa_input.classList.add('vermei')
        numero_empresa_input.classList.add('vermei')

    } else {
        Cookies.set('empresa',1)
        abrirjanela('blue','Verificando dados','Validando Alteração', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
    }
}

function sair(){
    window.location.href= '../../index'
    localStorage.clear()
}

function fechar_menu(){
    document.getElementsByTagName('html')[0].classList.remove('nav-open')
}

function abrir_menu(){
    if(!document.getElementsByTagName('html')[0].classList.contains('nav-open')){
        document.getElementsByTagName('html')[0].classList.add('nav-open')
    }
}