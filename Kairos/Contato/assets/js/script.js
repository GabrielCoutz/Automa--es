function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
}
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const assunto = document.getElementById('assunto')
const mensagem = document.getElementById('mensagem')
const nomeSalvo = document.getElementById('nomeSalvo').innerText.trim()

$(document).ready(function() {
    if(!vazio(nomeSalvo)){
        nome.value = nomeSalvo
    }
});

function validar(){

}