window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function erro(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        window.location.href = "../index"
    })
    document.getElementById('asdf_cancelar').click()
}

if (window.location.href.includes(md5('erro=true'))) { // erro de cadastro
    abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada','falha')
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(erro , 3000)
}
const plano = document.getElementById('plano').innerText

function marcarPlano(){
    switch (plano) {
    case 'Básico':
        document.getElementById('basico').classList.add('escolhido')
        document.getElementById('basicobtn').classList.add('btn-primary')
        document.getElementById('basicobtn').disabled = true
        document.getElementById('basicobtn').classList.remove('btn-outline-primary')
        document.getElementById('basicobtn').innerHTML = 'Plano Atual'
        break;

    case 'Intermediário':
        document.getElementById('intermediario').classList.add('escolhido')
        document.getElementById('intermediariobtn').disabled = true
        document.getElementById('intermediariobtn').classList.add('btn-primary')
        document.getElementById('intermediariobtn').classList.remove('btn-outline-primary')
        document.getElementById('intermediariobtn').innerHTML = 'Plano Atual'
        break;

    case 'Premium':
        document.getElementById('premium').classList.add('escolhido')
        document.getElementById('premiumbtn').classList.add('btn-primary')
        document.getElementById('premiumbtn').disabled = true
        document.getElementById('premiumbtn').classList.remove('btn-outline-primary')
        document.getElementById('premiumbtn').innerHTML = 'Plano Atual'
        break;
    }
}
setTimeout(marcarPlano, 800)

function enviar(assinatura){
    if (plano == ''){
        window.location.href = "../CadastroCartao/cadastro_cartao?plano="+assinatura.name
    } else {
        abrirJanelaPlanos(assinatura.name, plano)
    }
}

function voltar(){
    window.location.href = "../Perfil/usuario";
}