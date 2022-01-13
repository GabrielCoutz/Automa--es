function validar(){
    document.getElementById('butao').setAttribute('name', 'butao');
    var email = document.getElementById("email")
    var senha = document.getElementById("senha")
    $("#cadastro").submit(function(e) {
        e.preventDefault();
    });

    email.classList.remove("vermei")
    senha.classList.remove("vermei")

    if (email.value == "" ||  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)){
        alert("Por favor, insira um email válido!");
        $(document).ready(function () {
            $("#email").focus();
            document.getElementById("email").focus();
          });
        email.classList.add("vermei")

    } else if (senha.value == ""){
        alert("Por favor, preencha a senha!");
        $(document).ready(function () {
            $("#senha").focus();
            document.getElementById("senha").focus();
          });
        senha.classList.add("vermei")
        

    } else{
        document.getElementById('cadastro').submit();
    }
}