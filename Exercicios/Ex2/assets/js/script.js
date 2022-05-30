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

function somenteLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
    if(event.value != undefined){
        let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
        event.value = limpo.replace('-','').replace('_','')
    }
}

function validar(){
    limparErros()
    let letra = document.getElementById('letra')

    if (letra.value == '') {
        sinalizarErro(letra.id, 'Digite pelo menos 1 letra!')
    } else {
        document.getElementById('form').submit()
    }
}