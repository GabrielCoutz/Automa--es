window.onload = function () {
  window.setTimeout(fadeout, 500);
}

function fadeout() {
  document.querySelector('.preloader').style.opacity = '0';
  document.querySelector('.preloader').style.display = 'none';
}

function nada(){
  document.getElementById('asdf_cancelar').click()
}

const num = function(){ return document.getElementById("cardNumber")}
const nome = function (){ return document.getElementById('cardName')}
const mes = function (){ return document.getElementById('cardMonth')}
const ano = function (){ return document.getElementById('cardYear')}
const cvv = function (){ return document.getElementById('cardCvv')}
const cpf = document.getElementById("cpf")
const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const endereco = document.getElementById("endereco")

const limpar_inputs = function(){
  let elementos = document.getElementsByTagName('input')
  for(let i = 0; i < elementos.length ; i++){
    elementos[i].classList.remove('vermei')
  }
  limpar_alertas()
}

const limpar_alertas = function(){
  let alerta = document.getElementsByClassName('alerta')
  for(let i = 0; i < alerta.length ; i++){
    if (!alerta[i].classList.contains('none')){
      alerta[i].classList.toggle('none')
    }
  }
}

function ler(cep){

  if(cep.value.length == 10){
          $.ajax({
              url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/',
              dataType: 'json',
              success: function(resposta){
                  if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                      abrirjanela('red','CEP inválido!<br>Por favor, insira os números novamente.','Dados Inválidos', 'falha')
                      $("#cep").addClass('vermei')
                      $("#cep").focus()
                      document.getElementById('butao').disabled = true
                      return
                  } else {
                    $("#cep").removeClass('vermei')
                    document.getElementById('butao').disabled = false
                      $("#rua").val(resposta.logradouro);
                      $("#bairro").val(resposta.bairro);
                      $("#cidade").val(resposta.localidade);
                      $("#estado").val(resposta.uf);

                      let endereco_full = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf

                      $("#endereco").html(endereco_full)

                      $("#numero").focus();
              }}
          });
  }
}

function limparURL(url){ // tira o disparador de popup da url, limpando-a
  let nextURL = window.location.href.replace('?'+url,'');
  let nextState = { additionalInformation: 'Updated the URL with JS' };
  window.history.replaceState(nextState, 'Cadastro', nextURL);
}

function apenasLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
  if(event.value != undefined){
      let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
      event.value = limpo.replace('-','').replace('_','')
  }
}

switch (true) {
  case window.location.href.includes(md5('erro=true')): // erro de cadastro
    abrirjanela('red','<br>Não foi possível realizar o cadastro!', 'Conta não sincronizada', 'falha')
    
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(nada , 4000)
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
      window.location.href = "../index"
    })
    limparURL(md5('erro=true'))
    break;

  case window.location.href.includes(md5('cpf=false')):
    limparURL(md5('cpf=false'))
    abrirjanela('red','CPF já utilizado!', 'Dados Duplicados','falha')
    cpf.classList.add('vermei')
    break;
}

function alertaDeErro(elemento, mensagem){
  document.getElementById(elemento+'Alert').innerHTML = mensagem
  if(document.getElementById(elemento+'Alert').classList.toggle('none')){
    document.getElementById(elemento+'Alert').classList.toggle('none')
  }
}

function validar_cpf(cpf) {
  let Soma = 0 ;
  let Resto;
  cpf = String(cpf).replace('.','').replace('-','').replace('.','')
if (  cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" ) return 1;


  for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10)) ) return 1;

Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11) ) ) return 1;
  return 0
}

function evento_cpf(cpf){
  if(cpf.value.length == 14){
      if (validar_cpf(cpf.value) == 1){
          alertaDeErro(cpf.id, 'Por favor, insira um CPF válido!')
          cpf.focus()
          cpf.classList.add("vermei")
          document.getElementById('butao').disabled = true
      } else {
          document.getElementById(cpf.id+'Alert').classList.add('none')
          cpf.classList.remove("vermei")
          document.getElementById('butao').disabled = false
      }
  }
}

$(document).ready(function(){ // desabilita CTRL+V por motivos de incompatibilidade de máscara
  $('#cpf').on("cut copy paste",function(e) {
      e.preventDefault();
   });
  $('#numero').on("cut copy paste",function(e) {
    e.preventDefault();
  });
  $('#cep').on("cut copy paste",function(e) {
  e.preventDefault();
  });
});

$(document).keypress( // desativa tecla ENTER
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function vazio(item){ // verifica se o valor passado está vazio
  return item.trim() == ''
}

const dispararEvento = function(elemento, evento, stringCondicao){  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

  var condicao // função usada para validação

  switch(stringCondicao){ // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
      case 'condicaoNum': var condicao = function(){ return num().value.length == 19}; break;
      case 'condicaoNome': var condicao = function(){ return nome().value.length > 5}; break;
      case 'condicaoMes': var condicao = function(){ return !vazio(mes().value)}; break;
      case 'condicaoAno': var condicao = function(){ return !vazio(ano().value)}; break;
      case 'condicaoCvv': var condicao = function(){ return cvv().value.length == 3}; break;
      case 'condicaoNumero': var condicao = function(){ return !$('#numero').val() == ''}; break;
      case 'condicaoCep': var condicao = function(){ return cep.value.length >= 10}; break;
  }
  let funcao = function(){ // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
      if(condicao()){
          elemento.classList.remove('vermei')
          document.getElementById(elemento.id+'Alert').classList.add('none')
          elemento.removeEventListener(evento,funcao)
          document.getElementById('butao').disabled = false
      }
  }

  // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
  document.getElementById('butao').disabled = true
  elemento.addEventListener(evento,funcao)
}



function validar(){
  limpar_inputs()

  if (num().value.length != 19){
    alertaDeErro(num().id, 'Preencha o número do cartão!')
    dispararEvento(num(), 'keyup', 'condicaoNum')
    num().focus()
    num().classList.add('vermei')
    
  } else if (nome().value.length < 5){
    alertaDeErro(nome().id, 'Preencha o nome do titular!')
    dispararEvento(nome(), 'keyup', 'condicaoNome')
    nome().focus()
    nome().classList.add('vermei')

  } else if (vazio(mes().value)){
    alertaDeErro(mes().id, 'Selecione o mês!')
    dispararEvento(mes(), 'change', 'condicaoMes')
    mes().focus()
    mes().classList.add('vermei')

  } else if (vazio(ano().value)){
    alertaDeErro(ano().id, 'Selecione o ano!')
    dispararEvento(ano(), 'change', 'condicaoAno')
    ano().focus()
    ano().classList.add('vermei')

  } else if (cvv().value.length < 3){
    alertaDeErro(cvv().id, 'Preencha o CVV do cartão!')
    dispararEvento(cvv(), 'keyup', 'condicaoCvv')
    cvv().focus()
    cvv().classList.add('vermei')

  } else if ($('#cpf').val().length < 14){
    alertaDeErro(cpf.id, 'Preencha o CPF!')
    cpf.focus()
    $('#cpf').addClass('vermei')

  } else if ($('#cep').val().length < 10){
    dispararEvento(cep, 'keyup', 'condicaoCep')
    alertaDeErro(cep.id, 'Preencha o CEP!')
    cep.focus()
    cep.classList.add('vermei')

  } else if (vazio($('#numero').val())){
    dispararEvento(document.getElementById('numero'), 'keyup', 'condicaoNumero')
    alertaDeErro(numero.id, "Preencha o Número!")
    numero.focus()
    $('#numero').addClass("vermei")

  } else {
    localStorage.setItem(cep.id,cep.value)
    localStorage.setItem(numero.id,numero.value)
    abrirjanela('blue','Validando Dados','Cadastrando Cartão', 'carregar')
    document.getElementById('asdf_cancelar').style.display = 'none'
    setTimeout(nada , 4000)
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
            document.getElementById('cadastro_cartao').submit()
        })
  }
}

new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
      
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType () {
      let number = this.cardNumber.replace(/[^0-9]+/g, '');
  
      re = new RegExp(/^4[0-9]{15}$/);
      if (number.match(re) != null) return "visa";

      re = new RegExp(/^3[47][0-9]{13}/);
      if (number.match(re) != null) return "amex";

      re = new RegExp(/^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/);
      if (number.match(re) != null) return "mastercard";

      re = new RegExp(/^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/);
      if (number.match(re) != null) return "elo";

      re = new RegExp(/^6(?:011|5[0-9]{2})[0-9]{12}/);
      if (number.match(re) != null) return "discover";

      re = new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}/);
      if (number.match(re) != null) return "dinersclub";

      re = new RegExp(/^606282|^3841(?:[0|4|6]{1})0/);
      if (number.match(re) != null) return "hipercard";

      return "";
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
});