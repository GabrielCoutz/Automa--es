window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function nada(){
    document.getElementById('asdf_cancelar').click()
}


$('select[name="ramo"]').on('change', function() {
    if (this.value == "") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();


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

limpar_inputs()

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

const nome_empresa = document.getElementById("nome_empresa")
const nome_fantasia = document.getElementById("nome_fantasia")
const cnpj = document.getElementById("cnpj")
const cep_empresa = document.getElementById("cep_empresa")
const rua_empresa = document.getElementById("rua_empresa")
const numero_empresa = document.getElementById("numero_empresa")
const bairro_empresa = document.getElementById("bairro_empresa")
const cidade_empresa = document.getElementById("cidade_empresa")
const estado_empresa = document.getElementById("estado_empresa")
const ramo = document.getElementById("ramo")

if (window.location.href.includes(md5('erro=true'))) { // erro de cadastro
    abrirjanela('red','<br>Não foi possível realizar o cadastro!', 'Conta não sincronizada')
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(nada , 4000)
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
            window.location.href = "../index"
        })
    
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'CadastroEmpresa', nextURL);
}

if (window.location.href.includes(md5('cnpj=false'))){
    localStorage.setItem('erro',1)
    
    ler(localStorage.getItem('cep_empresa'))
    
    document.getElementById('cadastro_empresa').focus()
    abrirjanela('red','CNPJ já cadastrado!','Andamento Cadastro')
    cnpj.classList.add('vermei')
    cnpj.focus()

    console.log(localStorage.getItem('erro'))
    console.log(localStorage.getItem('cep_empresa'))
    
    nome_empresa.value=localStorage.getItem('nome_empresa')
    nome_fantasia.value=localStorage.getItem('nome_fantasia')
    cep_empresa.value=localStorage.getItem('cep_empresa')
    numero_empresa.value=localStorage.getItem('numero_empresa')
    ramo.value=localStorage.getItem('ramo')
    
    let nextURL = window.location.href.replace(md5('cnpj=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'CadastroEmpresa', nextURL);
}

function validarCNPJ(cnpj) {
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999") return 1;
         
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return 1;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return 1;
    return 0;
    
}

function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
}

cnpj.addEventListener('keyup',function(){
    if(cnpj.value.length == 18){
        if (cnpj.value == "" || validarCNPJ(cnpj.value.replace(/[^\d]+/g,'')) == 1){
            alertaDeErro(cnpj.id, 'Por favor, insira um cnpj válido!')
            cnpj.focus()
            cnpj.classList.add("vermei")
            document.getElementById('butao').disabled = true
            document.getElementById('butaoAlert').classList.remove('none')
        } else {
            document.getElementById(cnpj.id+'Alert').classList.add('none')
            cnpj.classList.remove("vermei")
            document.getElementById('butao').disabled = false
            document.getElementById('butaoAlert').classList.add('none')
        }
    }
})

function ler(cep){

    if(localStorage.getItem('erro') == 1){
        cep = document.getElementById('cep_empresa')
    }

    if(cep.value.length == 10){
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/unicode/',
                dataType: 'json',
                success: function(resposta){
                    if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                        abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','Dados Inválidos')
                        cep_empresa.classList.add('vermei')
                        cep_empresa.focus()
                        return
                    } else {
                        cep_empresa.classList.remove('vermei')
                        $("#rua_empresa").val(resposta.logradouro);
                        $("#bairro_empresa").val(resposta.bairro);
                        $("#cidade_empresa").val(resposta.localidade);
                        $("#estado_empresa").val(resposta.uf);
                        $("#estado_empresa").css('opacity', '1').change();
                        let endereco_full = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf

                        $('#edit').toggle()
                        endereco.innerHTML = endereco_full
                        numero_empresa.focus()
                }}
            });
    }
}

function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
}

const dispararEvento = function(elemento, evento, stringCondicao){  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

    var condicao // função usada para validação

    switch(stringCondicao){ // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
        case 'condicaoCNPJ': var condicao = function(){return validarCNPJ(cnpj.value) == 1}; break;
        case 'condicaoCep': var condicao = function(){ return cep.value.length != 10}; break;
        case 'condicaoNumero': var condicao = function(){ return vazio(numero.value)}; break;
    }

    let funcao = function(){ // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
        if(!condicao()){
            elemento.classList.remove('vermei')
            document.getElementById(elemento.id+'Alert').classList.add('none')
            elemento.removeEventListener(evento,funcao)
            document.getElementById('butao').disabled = false
        }
    }

    // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
    document.getElementById('butao').disabled = true
    elemento.addEventListener(evento,funcao)

}



function validar(){
    limpar_inputs()
    ramo.classList.remove("vermei")

    if(vazio(nome_empresa.value)){
        alertaDeErro(nome_empresa.id, "Por favor, preencha o da Empresa!")
        nome_empresa.focus()
        nome_empresa.classList.add("vermei")

    } else if (vazio(nome_fantasia.value)) {
        alertaDeErro(nome_fantasia.id, "Por favor, preencha o Nome Fantasia!")
        nome_fantasia.focus()
        nome_fantasia.classList.add("vermei")

    } else if(vazio(cnpj.value) || cnpj.value.length != 18){
        dispararEvento(cnpj, 'keyup', 'condicaoCNPJ')
        alertaDeErro(cnpj.id, "Por favor, preencha o CNPJ!")
        cnpj.focus()
        cnpj.classList.add("vermei")

    }else if (vazio(ramo.value)){
        alertaDeErro(ramo.id, "Por favor, preencha o ramo!")
        ramo.focus()
        ramo.classList.add("vermei")

    } else if(vazio(cep_empresa.value)){
        alertaDeErro(cep_empresa.id, "Por favor, preencha o CEP!")
        cep_empresa.focus()
        cep_empresa.classList.add("vermei")

    }else if (vazio(numero_empresa.value)){
        alertaDeErro(numero_empresa.id, "Por favor, preencha o Número!")
        numero_empresa.focus()
        numero_empresa.classList.add("vermei")

    } else {
        localStorage.setItem(nome_empresa.id,nome_empresa.value)
        localStorage.setItem(nome_fantasia.id,nome_fantasia.value)
        localStorage.setItem(cep_empresa.id,cep_empresa.value)
        localStorage.setItem(numero_empresa.id,numero_empresa.value)
        localStorage.setItem(ramo.id,ramo.value)

        if(window.location.href.includes(md5('cadastro=true'))){
            Cookies.set('cadastro_empresa',1)
        }

        abrirjanela('blue','Verificando Banco de Dados, caso tudo certo prosseguiremos.','Andamento Cadastro')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 1500)

        document.getElementById('asdf_cancelar').addEventListener('click',function(){
            document.getElementById('cadastro_empresa').submit()
            }
        )
        }
}
