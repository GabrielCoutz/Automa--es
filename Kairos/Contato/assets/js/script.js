window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() { // animação de loader inicial/2
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const logado = document.getElementById('logado').innerText == 'true'

if (logado){
    document.getElementById('texto').innerHTML = 'Voltar à tela do Usuário'
}

function voltar(){
    if (logado){
        window.location.href = "../Perfil/usuario"
    
    } else {
        window.location.href = "../index"
    }
}