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
    let nota1 = document.getElementById('nota1')
    let nota2 = document.getElementById('nota2')
    let nota3 = document.getElementById('nota3')

    switch (true) {
        case nota1.value == '':
            sinalizarErro(nota1.id, 'É necessário informar a nota')
            break;

        case nota2.value == '':
            sinalizarErro(nota2.id, 'É necessário informar a nota')
            break;
        
        case nota3.value == '':
            sinalizarErro(nota3.id, 'É necessário informar a nota')
            break;

        default:
            document.getElementById('form').submit()
    }
}