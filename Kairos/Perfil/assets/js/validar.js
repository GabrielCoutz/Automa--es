window.onload = function () { // animação de loader inicial
    window.setTimeout(fadeout, 500);
}

function fadeout() { // animação de loader inicial/2
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

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



const verSenhaAntiga = function () {
    let elemento = document.getElementById('togglePassword_antigo')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('bi-eye')
}

const verSenhaAntigaNovo = function () {
    let elemento = document.getElementById('togglePassword_novo')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('bi-eye')
}

const verSenhaAntigaNovoDup = function () {
    let elemento = document.getElementById('togglePassword_novo_dup')
    let type = elemento.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
    elemento.previousElementSibling.setAttribute('type', type)
    elemento.classList.toggle('bi-eye')
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
// -------------------- fim código popup --------------------

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

if (window.location.href.includes(md5('erro=true'))) { // erro de login
    abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada')
    document.getElementsByClassName('content')[0].style.display = 'none'
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(erro , 3000)
    
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);

}

if (window.location.href.includes(md5('email_duplicado=true'))) { // email erro
    document.getElementById('editarbtn').click()
    document.getElementById("email_input").classList.add('vermei')
    abrirjanela('red','Email já cadastrado!', 'Alteração Inválida')
    
    let nextURL = window.location.href.replace(md5('email_duplicado=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

if (window.location.href.includes(md5('senha=false'))) { // senha erro
    abrirjanela('red','Não foi possível alterar sua senha!<br>Por favor, verifique os campos e tente novamente.', 'Alteração Inválida')
    
    document.getElementById('editarsenha').click()
    document.getElementById("senha_antiga").classList.add('vermei')
    document.getElementById("senha_nova").classList.add('vermei')
    document.getElementById("senha_nova_dup").classList.add('vermei')
    
    let nextURL = window.location.href.replace(md5('senha=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

if(window.location.href.includes(md5('sucesso=true'))){
    abrirjanela('green','Dados alterados com êxito.', 'Alteração realizada com sucesso')

    let nextURL = window.location.href.replace(md5('sucesso=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

function validarEmail(email){ // auto-explicativo
    if (email != ''){
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email)
    } else {
        return true
    }
}

function verificar_input(){ // se ouver entrada nos inputs, o botão de salvar é liberado

    let lista = document.getElementsByClassName('adicional')
    let tel_input = false

    for(let i = 0; i < lista.length; i++){ // impede que o usuário salve o telefone adicionado sem que o mesmo esteja completo, com 15 dígitos
        console.log(lista[i].value.length)
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

    if (vazio(nome_input.value) && vazio(email_input.value) && vazio(cep_input.value) && vazio(numero_input.value) && !deletar && !tel_input){ // se houver dados alterados, o usuário é liberado para salvá-los
        document.getElementById('salvarbtn').disabled = true

    } else {
        document.getElementById('salvarbtn').disabled = false
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
        let temp = cep.value
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','Alteração Inválida')
                    cep_input.classList.add('vermei')
                    cep_input.focus()
                    cep_input.placeholder = temp
                    cep_input.value = ''
                    return
                } else {
                    document.getElementsByName('rua')[0].value = resposta.logradouro
                    document.getElementsByName('bairro')[0].value = resposta.bairro
                    document.getElementsByName('cidade')[0].value = resposta.localidade
                    document.getElementsByName('estado')[0].value = resposta.uf
                    document.getElementById('endereco').innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero_input.focus()
                    Cookies.set('endereco',1)
                }
            }
        })
    }
}


$(function(){ // código para adicionar/remover números de telefone
    $('.btn-remove-phone').click(function(){
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
                    '<input type="tel" name="phone'+index+'number" placeholder="(00) 0000-00000" class="adicional" onkeypress="$(this).mask('+num+')"/>'+
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

if(document.getElementById('editarbtn').addEventListener('click',function(){ // libera eventelistener para ver alterações de inputs
    document.getElementById('salvarbtn').disabled = true
    alteracao('click')
    alteracao('keyup')
}))


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
    console.log(PasswordParameter)
    console.log(vazio(PasswordParameter))
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
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
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
        document.getElementById("editarbtn").classList.toggle("none");
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

    //remove sinalização de erros
    nome_input.classList.remove('vermei')
    email_input.classList.remove('vermei')
    cep_input.classList.remove('vermei')
    numero_input.classList.remove('vermei')

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

function editar(item){
    if(item.id == 'editarsenha'){

        document.getElementById("pass").classList.toggle("none");
        document.getElementById("editarsenha").classList.toggle("none");
        document.getElementById("pass2").classList.toggle("none");
        document.getElementById("pass3").classList.toggle("none");

        document.getElementById('pass').style.display = 'block'
        document.getElementById('pass2').style.display = 'block'
        document.getElementById('pass3').style.display = 'block'
        password.value = ''

        document.getElementById("editarbtn").classList.toggle("none");
        document.getElementById("salvar_senhabtn").classList.toggle("none");
        document.getElementById("cancelar_senhabtn").classList.toggle("none");

        document.getElementsByClassName('senha')[0].innerText = 'Alterar Senha'

        password.addEventListener("keyup", verificarSenha)

        document.getElementById('togglePassword_antigo').addEventListener('click', verSenhaAntiga)
        document.getElementById('togglePassword_novo').addEventListener('click', verSenhaAntigaNovo)
        document.getElementById('togglePassword_novo_dup').addEventListener('click', verSenhaAntigaNovoDup)

        return
    }

    document.getElementById('senha').classList.toggle('none')
    alterar_edicao()

    // coloca o conteúdo em placeholder
    nome_input.placeholder = conteudo_nome
    email_input.placeholder = conteudo_email
    cep_input.placeholder = conteudo_cep
    numero_input.placeholder = conteudo_numero
}

function cancelar(item){
    limpar_alertas()
    if(item.id == 'cancelar_senhabtn'){
        alterar_edicao('senha')

        document.getElementById('togglePassword_antigo').removeEventListener('click', verSenhaAntiga)
        document.getElementById('togglePassword_novo').removeEventListener('click', verSenhaAntigaNovo)
        document.getElementById('togglePassword_novo_dup').removeEventListener('click', verSenhaAntigaNovoDup)

        password.removeEventListener("keyup", verificarSenha)
        strengthBadge.classList.add('none')
        console.log('parou')

        return
    }


    document.removeEventListener('click', verificar_input)
    document.removeEventListener('keyup', verificar_input)

    document.getElementById('editarsenha').disabled = false
    alterar_edicao()

    document.getElementById('editarbtn').classList.remove('none')
    document.getElementById('senha').classList.toggle('none')

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
            //alert('Por favor, verifique os campos e tente novamente!')

        } else {
            abrirjanela('blue','Verificando dados...','Validando Alteração')
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
        abrirjanela('red','Telefone adicional incompleto<br> Por favor verifique-o ou remova-o!','Dados incompletos')
        return
    } else {
        Cookies.set('usuario',1)
        Cookies.set('tels',tels)
    }

    if (!validarEmail(email_input.value)){
        alertaDeErro(email_input.id, 'Por favor, insira um email válido!')
        email_input.classList.add('vermei')
        email_input.focus()

    } else if (!vazio(cep_input.value) && cep_input.value.length <= 10 && vazio(numero_input.value)){
        alertaDeErro(cep_input.id, 'Por favor, complete o endereço!')
        cep_input.classList.add('vermei')
        cep_input.focus()
        numero_input.classList.add('vermei')
        numero_input.focus()

    } else {
        Cookies.set('usuario',1)
        abrirjanela('blue','Verificando dados...','Validando Alteração')
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