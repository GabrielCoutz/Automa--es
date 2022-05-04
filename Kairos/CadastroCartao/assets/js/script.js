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
// -------------------- início código popup --------------------
var janelaPopUp = new Object();
var iconee = ''

janelaPopUp.abre = function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){
    var cancelar = (textoCancelar !== undefined)? textoCancelar: 'Ok';
    var enviar = (textoEnviar !== undefined)? textoEnviar: 'Send';
    classes += ' ';
    var classArray = classes.split(' ');
    classes = '';
    classesFundo = '';
    var classBot = '';
    $.each(classArray, function(index, value){
        switch(value){
            case 'alert' : classBot += ' alert '; break;
            case 'blue' : classesFundo += this + ' ';
            case 'green' : classesFundo += this + ' ';
            case 'red' : classesFundo += this + ' ';
            case 'white': classesFundo += this + ' ';
            case 'orange': classesFundo += this + ' ';
            case 'purple': classesFundo += this + ' ';
            default : classes += this + ' '; break;
        }
    });

    let src = ''
    let trigger = "trigger='loop' "
    let delay = "delay='1000' "
    let colors = "colors= 'primary:#121331,secondary:#ffffff' "
    let style= "style= 'width:46px;height:46px'> "

    switch (true) { // determina qual ícone aparecerá no popup de acordo com a string passada na varaiável 'icone'
      case iconee == 'sucesso':
        src = "src='https://cdn.lordicon.com/lupuorrc.json' "
        break;
      case iconee == 'falha':
            src = "src= 'https://cdn.lordicon.com/tdrtiskw.json' "
            break;
      case iconee == 'carregar':
            src = "src= 'https://cdn.lordicon.com/dpinvufc.json' "
            delay = "delay = '10' "
            colors = " colors= 'primary:#ffffff,secondary:#ffffff' "
            break;
    }
  
    var popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div>"+"<lord-icon " + src + trigger + delay + colors + style + "</lord-icon><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
    $("window, body").css('overflow', 'hidden');
    
    $("body").append(popFundo);
    $("body").append(janela);
    $("body").append(popFundo);
     //alert(janela);
    $("#popFundo_" + id).fadeIn("fast");
    $("#" + id).addClass("popUpEntrada");
    
    $("#" + id + '_cancelar').on("click", function(){
        if((functionCancelar !== undefined) && (functionCancelar !== '')){
            functionCancelar();
            
        }else{
            janelaPopUp.fecha(id);
        }
    });
    $("#" + id + '_enviar').on("click", function(){
        if((functionEnviar !== undefined) && (functionEnviar !== '')){
            functionEnviar();
        }else{
            janelaPopUp.fecha(id);
        }
    });
    
};

janelaPopUp.fecha = function(id){
    if(id !== undefined){
        $("#" + id).removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $("#popFundo_" + id).fadeOut(1000, function(){
                $("#popFundo_" + id).remove();
                $("#" + $(this).attr("id") + ", #" + id).remove();
                if (!($(".popUp")[0])){
                    $("window, body").css('overflow', 'auto');
                }
            });
            
            
      
    }
    else{
        $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $(".popUpFundo").fadeOut(1000, function(){
                $(".popUpFundo").remove();
                $(".popUp").remove();
                $("window, body").css('overflow', 'auto');
              });
              
              
            }
          }
          
    function abrirjanela(cor, texto, titulo, trigger){
      var tamanho = 'p';
      var modo = 'alert';
      iconee = trigger
      janelaPopUp.abre( "asdf", tamanho + " "  + cor + ' ' + modo,  titulo ,  texto)
    }
// -------------------- fim código popup --------------------

const num = function(){return document.getElementById("cardNumber")}
const nome = function (){ return document.getElementById('cardName')}
const mes = function (){ return document.getElementById('cardMonth')}
const ano = function (){ return document.getElementById('cardYear')}
const cvv = function (){ return document.getElementById('cardCvv')}

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


if (window.location.href.includes(md5('erro=true'))) { // erro de cadastro
  abrirjanela('red','<br>Não foi possível realizar o cadastro!', 'Conta não sincronizada', 'falha')
  
  document.getElementById('asdf_cancelar').style.display = 'none'
  setTimeout(nada , 4000)
  document.getElementById('asdf_cancelar').addEventListener('click',function(){
    window.location.href = "../index"
  })
  
  let nextURL = window.location.href.replace(md5('erro=true'),'').replace('?','');
  let nextState = { additionalInformation: 'Updated the URL with JS' };
  window.history.replaceState(nextState, 'CadastroCartao', nextURL);
}

function alertaDeErro(elemento, mensagem){
  document.getElementById(elemento+'Alert').innerHTML = mensagem
  document.getElementById(elemento+'Alert').classList.toggle('none')
}

function vazio(item){ // verifica se o valor passado está vazio
  return item.trim() == ''
}

const dispararEvento = function(elemento, evento, stringCondicao){  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

  var condicao // função usada para validação

  switch(stringCondicao){ // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
      case 'condicaoNum': var condicao = function(){ return num().value.length == 19}; break;
      case 'condicaoNome': var condicao = function(){ return nome().value.length == 5}; break;
      case 'condicaoMes': var condicao = function(){ return !vazio(mes().value)}; break;
      case 'condicaoAno': var condicao = function(){ return !vazio(ano().value)}; break;
      case 'condicaoCvv': var condicao = function(){ return cvv().value.length == 3}; break;
  }
  console.log(condicao())
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
    alertaDeErro(num().id, 'Por favor, preencha o número do cartão!')
    dispararEvento(num(), 'keyup', 'condicaoNum')
    num().focus()
    num().classList.add('vermei')
    
  } else if (vazio(nome().value)){
    alertaDeErro(nome().id, 'Por favor, preencha o nome do titular!')
    dispararEvento(nome(), 'keyup', 'condicaoNome')
    nome().focus()
    nome().classList.add('vermei')

  } else if (vazio(mes().value)){
    alertaDeErro(mes().id, 'Por favor, selecione o mês!')
    dispararEvento(mes(), 'change', 'condicaoMes')
    mes().focus()
    mes().classList.add('vermei')

  } else if (vazio(ano().value)){
    alertaDeErro(ano().id, 'Por favor, selecione o ano!')
    dispararEvento(ano(), 'change', 'condicaoAno')
    ano().focus()
    ano().classList.add('vermei')

  } else if (cvv().value.length < 3){
    alertaDeErro(cvv().id, 'Por favor, preencha o CVV do cartão!')
    dispararEvento(cvv(), 'keyup', 'condicaoCvv')
    cvv().focus()
    cvv().classList.add('vermei')

  } else {
    abrirjanela('green','Cartão cadastrado com sucesso!','Sucesso', 'sucesso')
    document.getElementById('asdf_cancelar').addEventListener('click',function(){
      document.getElementById('cadastro_cartao').submit()
      localStorage.clear();
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