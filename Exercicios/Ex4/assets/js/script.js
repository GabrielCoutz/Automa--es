function limparErros(){
    let alertas = document.getElementsByClassName('alerta')
    let inputs = document.getElementsByTagName('input')

    for (let i = 0; i < alertas.length; i++) {
        if(!alertas[i].classList.contains('none')){
            alertas[i].classList.add('none')
        }
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('erro')
    }
}

function sinalizarErro(elemento, mensagem){
    document.getElementById(elemento+'Alert').classList.remove('none')
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento).classList.add('erro')
}

function validar(){
    limparErros()
    let num1 = document.getElementById('num1')
    let num2 = document.getElementById('num2')

    switch (true) {
        case num1.value == '':
            sinalizarErro(num1.id, 'Digite pelo menos 1 número!')
            break;

        case num2.value == '':
            sinalizarErro(num2.id, 'Digite pelo menos 1 número!')
            break;

        default:
            document.getElementById('form').submit()
    }
}