window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() { // animação de loader inicial/2
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const mensagem = document.getElementById('mensagem')

function copiaremail(){
    let content = document.getElementById('texto');
    
    for(let i = 0; i < 20; i++){
        console.log('copiado')

        content.select();
        document.execCommand('copy');
    }
    if(mensagem.classList.contains('none')){
        mensagem.classList.toggle('none')
    }
}