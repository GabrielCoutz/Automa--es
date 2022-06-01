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
    let idade = document.getElementById('num')

    if(idade.value == '0'){
        sinalizarErro(idade.id, 'Insira sua idade!')
    } else {
        document.getElementById('form').submit()
    }
}
