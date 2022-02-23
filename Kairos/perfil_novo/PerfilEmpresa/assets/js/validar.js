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
    if (this.value == "") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
}).change();

function ler_cep(cep){ // preenche o endereço automaticamente da empresa usando o cep
    if(cep.value.length == 10){
        let temp = cep.value
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/unicode/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    abrirjanela('red','CEP inválido!<br>Por favor, verifique os números e tente novamente.','| Alteração Inválida |')
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

function alteracao(evento){
    document.addEventListener(evento, function(){
        if (ramo_input.value != conteudo_ramo){
            Cookies.set('ramo',ramo_input.value)
        }
        if (vazio(nome_empresa_input.value) && vazio(nome_fantasia_input.value) && vazio(cep_empresa_input.value) && vazio(numero_empresa_input.value) && ramo_input.value == conteudo_ramo){
            document.getElementById('salvarbtn').disabled = true
        } else {
            document.getElementById('salvarbtn').disabled = false
        }
    })
}

alteracao('click')
alteracao('keyup')

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

    alterar_edicao()

    document.getElementById('editarbtn').classList.remove('none')

    nome_empresa_input.value = ''
    nome_fantasia_input.value = ''
    cep_empresa_input.value = ''
    numero_empresa_input.value = ''
    ramo_input.value = conteudo_ramo
    endereco_empresa.innerHTML = conteudo_endereco
}

function salvar(){
    if(!vazio(cep_empresa_input.value) && vazio(numero_empresa_input.value)){
        cep_empresa_input.classList.add('vermei')
        numero_empresa_input.classList.add('vermei')

    } else {
        Cookies.set('empresa',1)
        abrirjanela('blue','Verificando dados...','Validando Alteração')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
    }
}