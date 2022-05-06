$('select[name="estado"]').on('change', function() {
if (this.value == "estado") {
    $(this).css('opacity', '0.7');
} else {
    $(this).css('opacity', '1');
}

}).change();

$('select[name="setor"]').on('change', function() {
    if (this.value == "ramo") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();


document.getElementById('estado_empresa').addEventListener('change', function() {
    selecionar(document.getElementById('estado_empresa').value)
});



function selecionar2(obj){
    ramo = obj.options[obj.selectedIndex].text
}
function selecionar(obj){
    estado_empresa = obj.options[obj.selectedIndex].text
}

$("#cep_empresa").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#rua_empresa").val(resposta.logradouro);
            $("#bairro_empresa").val(resposta.bairro);
            $("#cidade_empresa").val(resposta.localidade);
            $("#estado_empresa").val(resposta.uf);
            document.getElementById("numero_empresa").focus()
        }
    });
});

function validar(){
    
    var nome = document.getElementById("nome_empresa")
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
    
    nome.classList.remove("vermei")
    nome_fantasia.classList.remove("vermei")
    cnpj.classList.remove("vermei")
    document.getElementById("ramo_in").classList.remove("vermei")
    
    if(nome.value == ""){
        alert("Por favor, preencha o Nome!");
        document.getElementById("nome_empresa").focus()
        nome.classList.add("vermei")

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
        document.getElementById("ramo_in").focus()
        document.getElementById("ramo_in").classList.add("vermei")
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
        alert(estado_empresa)
        alert("Por favor, preencha o Estado!")
        document.getElementById("estado_empresa").focus()
        document.getElementById("estado_empresa").classList.add("vermei")

    }else{
        alert(estado_empresa)
        alert("Tudo certo =D")
    }

}