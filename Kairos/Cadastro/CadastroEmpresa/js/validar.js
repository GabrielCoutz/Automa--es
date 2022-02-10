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


$('select[name="estado_empresa"]').on('change', function() {
if (this.value == "") {
    $(this).css('opacity', '0.7');
} else {
    $(this).css('opacity', '1');
    }
  }).change();

$('select[name="ramo"]').on('change', function() {
    if (this.value == "") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();

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
            window.location.href = "../../index.php"
        })
    
    let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'CadastroEmpresa', nextURL);
}


if (window.location.href.includes(md5('cnpj=false'))){
    abrirjanela('red','CNPJ já cadastrado!','| Andamento Cadastro | 2/3')
    cnpj.classList.add('vermei')
    cnpj.focus()

    nome_empresa.value=localStorage.getItem('nome_empresa')
    nome_fantasia.value=localStorage.getItem('nome_fantasia')
    cep_empresa.value=localStorage.getItem('cep_empresa')
    numero_empresa.value=localStorage.getItem('numero_empresa')
    ramo.value=localStorage.getItem('ramo')
    
    
    let nextURL = window.location.href.replace(md5('cnpj=false'),'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
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
         
    // Valida DVs
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

cnpj.addEventListener('keyup',function(){
    if(cnpj.value.length == 18){
        if (cnpj.value == "" || validarCNPJ(cnpj.value.replace(/[^\d]+/g,'')) == 1){
            alert("Por favor, insira um CNPJ válido!")
            cnpj.focus()
            cnpj.classList.add("vermei")
        } else {
            cnpj.classList.remove("vermei")
        }

    }
})

function ler(cep){
    if(cep.value.length == 10){
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/unicode/',
                dataType: 'json',
                success: function(resposta){
                    if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                        abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','| Dados Inválidos |')
                        cep_empresa.classList.add('vermei')
                        cep_empresa.focus()
                        return
                    } else {
                        cep_empresa.classList.remove('vermei')
                        $("#rua_empresa").val(resposta.logradouro);
                        $("#bairro_empresa").val(resposta.bairro);
                        $("#cidade_empresa").val(resposta.localidade);
                        $("#estado_empresa").val(resposta.uf);
                        //$("#estado_empresa").css('opacity', '1').change();
                        numero_empresa.focus()
                }}
            });
    }
}

function validar(){
    rua_empresa.classList.remove("vermei")
    numero_empresa.classList.remove("vermei")
    bairro_empresa.classList.remove("vermei")
    cidade_empresa.classList.remove("vermei")
    estado_empresa.classList.remove("vermei")
    nome_empresa.classList.remove("vermei")
    nome_fantasia.classList.remove("vermei")
    ramo.classList.remove("vermei")

    if(nome_empresa.value == ""){
        alert("Por favor, preencha o Nome em Empresa!");
        nome_empresa.focus()
        nome_empresa.classList.add("vermei")

    } else if (nome_fantasia.value == "") {
        alert("Por favor, preencha o Nome Fantasia!");
        nome_fantasia.focus()
        nome_fantasia.classList.add("vermei")

    } else if (ramo == ""){
        alert("Por favor, preencha o ramo!")
        ramo.focus()
        ramo.classList.add("vermei")

    } else if (rua_empresa.value == ""){
        alert("Por favor, preencha o Rua!")
        rua_empresa.focus()
        rua_empresa.classList.add("vermei")

    } else if (numero_empresa.value == ""){
        alert("Por favor, preencha o Número!")
        numero_empresa.focus()
        numero_empresa.classList.add("vermei")

    } else if (bairro_empresa.value == ""){
        alert("Por favor, preencha o Bairro!")
        bairro_empresa.focus()
        bairro_empresa.classList.add("vermei")

    } else if (cidade_empresa.value == ""){
        alert("Por favor, preencha a Cidade!")
        cidade_empresa.focus()
        cidade_empresa.classList.add("vermei")

    } else if (estado_empresa == ""){
        alert("Por favor, preencha o Estado!")
        estado_empresa.focus()
        estado_empresa.classList.add("vermei")

    } else {
        localStorage.setItem(nome_empresa.id,nome_empresa.value)
        localStorage.setItem(nome_fantasia.id,nome_fantasia.value)
        localStorage.setItem(cep_empresa.id,cep_empresa.value)
        localStorage.setItem(numero_empresa.id,numero_empresa.value)
        localStorage.setItem(ramo.id,ramo.value)

        abrirjanela('blue','Verificando Banco de Dados, caso tudo certo prosseguiremos.','| Andamento Cadastro | 2/3')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 1500)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
            document.getElementById('cadastro').submit()
            }
        )
        }
    }