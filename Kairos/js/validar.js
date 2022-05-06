$('select').on('change', function() {
    if (this.value == "1") {
      $(this).css('opacity', '0.7');
    } else {
      $(this).css('opacity', '1');
    }
  }).change();

var estado=""
let timeout;
let password = document.getElementById('senha')
let strengthBadge = document.getElementById('StrengthDisp')
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

password.addEventListener("input", () => {
    strengthBadge.style.display= 'block'
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(password.value), 500);
    if(password.value.length !== 0){
        strengthBadge.style.display != 'block'
    } else{
        strengthBadge.style.display = 'none'
    }
});

function StrengthChecker(PasswordParameter){
    if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.color="green"
        strengthBadge.textContent = 'Senha Forte'
    } else if(mediumPassword.test(PasswordParameter)){
        
        strengthBadge.style.color="#b6bf31";
        strengthBadge.textContent = 'Senha Mediana'
    } else{
        strengthBadge.style.color="red"
        strengthBadge.textContent = 'Senha Fraca'
    }
}

function selecionar(obj){
    estado = obj.options[obj.selectedIndex].text
}


$("#cep").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#rua").val(resposta.logradouro);
            $("#bairro").val(resposta.bairro);
            $("#cidade").val(resposta.localidade);
            $("#estado").val(resposta.uf);
            document.getElementById("numero").focus()
        }
    });
});


function validar(){
    var nome = document.getElementById("nome")
    var tel = document.getElementById("tel")
    var email = document.getElementById("email")
    var senha = document.getElementById("senha")
    var confirm_senha = document.getElementById("confirm_senha")
    var cep = document.getElementById("cep")
    var rua = document.getElementById("rua")
    var numero = document.getElementById("numero")
    var bairro = document.getElementById("bairro")
    var cidade = document.getElementById("cidade")


    nome.classList.remove("vermei")
    email.classList.remove("vermei")
    tel.classList.remove("vermei")
    senha.classList.remove("vermei")
    confirm_senha.classList.remove("vermei")
    cep.classList.remove("vermei")
    rua.classList.remove("vermei")
    numero.classList.remove("vermei")
    bairro.classList.remove("vermei")
    cidade.classList.remove("vermei")
    document.getElementById("estado").classList.remove("vermei")

    if(nome.value == ""){
        alert("Por favor, preencha o nome!");
        document.getElementById("nome").focus()
        nome.classList.add("vermei")

    } else if (tel.value == "") {
        alert("Por favor, preencha o telefone!");
        document.getElementById("tel").focus()
        tel.classList.add("vermei")

    } else if (email.value == ""){
        alert("Por favor, preencha o email!");
        document.getElementById("email").focus()
        email.classList.add("vermei")

    } else if (cep.value == ""){
        alert("Por favor, preencha o CEP!")
        document.getElementById("cep").focus()
        document.getElementById("cep").classList.add("vermei")

    } else if (rua.value == ""){
        alert("Por favor, preencha o Rua!")
        document.getElementById("rua").focus()
        document.getElementById("rua").classList.add("vermei")

    } else if (numero.value == ""){
        alert("Por favor, preencha o Número!")
        document.getElementById("numero").focus()
        document.getElementById("numero").classList.add("vermei")

    } else if (bairro.value == ""){
        alert("Por favor, preencha o Bairro!")
        document.getElementById("bairro").focus()
        document.getElementById("bairro").classList.add("vermei")

    } else if (cidade.value == ""){
        alert("Por favor, preencha a Cidade!")
        document.getElementById("cidade").focus()
        document.getElementById("cidade").classList.add("vermei")

    } else if (estado == ""){
        alert("Por favor, preencha o Estado!")
        document.getElementById("estado").focus()
        document.getElementById("estado").classList.add("vermei")

    } else if (senha.value == "" || confirm_senha.value == ""){
        alert("Por favor, preencha a senha!");
        document.getElementById("senha").focus()
        senha.classList.add("vermei")

    } else if (senha.value != confirm_senha.value){
        alert("Senhas não coincidem! Por favor, verifique-as!")
        document.getElementById("senha").focus()
        senha.classList.add("vermei")
        confirm_senha.classList.add("vermei")
        senha.value=""
        confirm_senha.value=""

    }else{
        alert("Tudo certo =D")
    }
    
}