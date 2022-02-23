const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cep = document.getElementById('cep')
const numero = document.getElementById('numero')

const nome_input = document.getElementById('nome_input')
const email_input = document.getElementById('email_input')
const cep_input = document.getElementById('cep_input')
const numero_input = document.getElementById('numero_input')

const conteudo_nome = document.getElementById('nome').innerText.trim()
const conteudo_email = document.getElementById('email').innerText.trim()
const conteudo_cep = document.getElementById('cep').innerText.trim()
const conteudo_numero = document.getElementById('numero').innerText.trim()


function alterar_edicao(){
    // esconde divs de conteúdo
    nome.classList.toggle("none")
    email.classList.toggle("none")
    cep.classList.toggle("none")
    numero.classList.toggle("none")

    //torna visível botões de edição
    document.getElementById('editarbtn').classList.add('none')
    document.getElementById('salvarbtn').classList.toggle('none')
    document.getElementById('cancelarbtn').classList.toggle('none')
    
    // torna visível input para edição
    nome_input.classList.toggle("none")
    email_input.classList.toggle("none")
    cep_input.classList.toggle("none")
    numero_input.classList.toggle("none")
}

function editar(){
    alterar_edicao()

    // coloca o conteúdo em placeholder
    nome_input.placeholder = conteudo_nome
    email_input.placeholder = conteudo_email
    cep_input.placeholder = conteudo_cep
    numero_input.placeholder = conteudo_numero
}

function cancelar(){
    alterar_edicao()

    document.getElementById('editarbtn').classList.remove('none')

    nome_input.value = ''
    email_input.value = ''
    cep_input.value = ''
    numero_input.value = ''
}