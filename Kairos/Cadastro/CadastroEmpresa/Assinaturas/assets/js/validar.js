$('div[name="plano"]').click(function() {
    alert(this.value)
})

function validar(){
    document.getElementById('retorno').setAttribute('value','basico');
    location.replace("CadastroCartao/mostrar.php");
}



var element = document.getElementsByName('plan')


function butao(){
    alert('butao')
    ele = ele.value = 'basica'
    return ele
}
function butao2(){
    alert('butao2')
    return ele.value = 'intermediario'
}
function butao3(){
    alert('butao3')
    return ele.value = 'premium'
}