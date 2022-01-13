$('select[name="estado"]').on('change', function() {
if (this.value == "estado") {
    $(this).css('opacity', '0.7');
} else {
    $(this).css('opacity', '1');
}

}).change();

$('select[name="ramo"]').on('change', function() {
    if (this.value == "ramo") {
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
    document.getElementById('cadastro').submit();
}
// -------------------- fim código popup --------------------

document.getElementById('estado_empresa').addEventListener('change', function() {
    selecionar(document.getElementById('estado_empresa').value)
});

function selecionar2(obj){
    var ramo = obj.options[obj.selectedIndex].text
}
function selecionar(obj){
    estado_empresa = obj.options[obj.selectedIndex].text
}

$("#cep_empresa").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val().toString().replace(/-/, '').replace('.', '')+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#rua_empresa").val(resposta.logradouro);
            $("#bairro_empresa").val(resposta.bairro);
            $("#cidade_empresa").val(resposta.localidade);
            $("#estado_empresa").val(resposta.uf);
            $("#estado_empresa").css('opacity', '1').change();
            document.getElementById("numero_empresa").focus()
        }
    });
});

function validar(){
    
    var nome_empresa = document.getElementById("nome_empresa")
    var nome_fantasia = document.getElementById("nome_fantasia")
    var cnpj = document.getElementById("cnpj")
    var cep_empresa = document.getElementById("cep_empresa")
    var rua_empresa = document.getElementById("rua_empresa")
    var numero_empresa = document.getElementById("numero_empresa")
    var bairro_empresa = document.getElementById("bairro_empresa")
    var cidade_empresa = document.getElementById("cidade_empresa")
    var estado_empresa = document.getElementById("estado_empresa").value

    cep_empresa.classList.remove("vermei")
    rua_empresa.classList.remove("vermei")
    numero_empresa.classList.remove("vermei")
    bairro_empresa.classList.remove("vermei")
    cidade_empresa.classList.remove("vermei")
    document.getElementById("estado_empresa").classList.remove("vermei")
    
    nome_empresa.classList.remove("vermei")
    nome_fantasia.classList.remove("vermei")
    cnpj.classList.remove("vermei")
    document.getElementById("ramo").classList.remove("vermei")
    
    if(nome_empresa.value == ""){
        alert("Por favor, preencha o Nome!");
        document.getElementById("nome_empresa").focus()
        nome_empresa.classList.add("vermei")

    } else if (nome_fantasia.value == "") {
        alert("Por favor, preencha o Nome Fantasia!");
        document.getElementById("nome_fantasia").focus()
        nome_fantasia.classList.add("vermei")

    } else if (cnpj.value == ""){
        alert("Por favor, preencha o CNPJ!");
        document.getElementById("cnpj").focus()
        cnpj.classList.add("vermei")

    } else if (ramo == "Selecione o Ramo"){
        alert("Por favor, preencha o ramo!")
        document.getElementById("ramo").focus()
        document.getElementById("ramo").classList.add("vermei")
    }else if (cep_empresa.value == ""){
        alert("Por favor, preencha o CEP!")
        document.getElementById("cep_empresa").focus()
        document.getElementById("cep_empresa").classList.add("vermei")

    } else if (rua_empresa.value == ""){
        alert("Por favor, preencha o Rua!")
        document.getElementById("rua_empresa").focus()
        document.getElementById("rua_empresa").classList.add("vermei")

    } else if (numero_empresa.value == ""){
        alert("Por favor, preencha o Número!")
        document.getElementById("numero_empresa").focus()
        document.getElementById("numero_empresa").classList.add("vermei")

    } else if (bairro_empresa.value == ""){
        alert("Por favor, preencha o Bairro!")
        document.getElementById("bairro_empresa").focus()
        document.getElementById("bairro_empresa").classList.add("vermei")

    } else if (cidade_empresa.value == ""){
        alert("Por favor, preencha a Cidade!")
        document.getElementById("cidade_empresa").focus()
        document.getElementById("cidade_empresa").classList.add("vermei")

    } else if (estado_empresa == "estado"){
        alert("Por favor, preencha o Estado!")
        document.getElementById("estado_empresa").focus()
        document.getElementById("estado_empresa").classList.add("vermei")

    }else{
        var tamanho = 'p';
        var cor = 'green';
        var modo = 'alert';
        var titulo = '| Andamento Cadastro | 2/3';
        var texto = 'Empresa Cadastrada com sucesso!';
        janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
        }
    }