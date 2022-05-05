// Código usado para popups, usando a função abrirjanela()
let janelaPopUp = new  Object();
let icone = ''

janelaPopUp.abre = function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){
    let cancelar = (textoCancelar !== undefined)? textoCancelar: 'Ok';
    let enviar = (textoEnviar !== undefined)? textoEnviar: 'Send';
    classes += ' ';
    let classArray = classes.split(' ');
    classes = '';
    let classesFundo = '';
    let classBot = '';
    $.each(classArray, function(index, value){
        switch(value){
            case 'alert' : ;classBot += ' alert '; break;
            case 'blue' : ;classesFundo += this + ' ';
            case 'green' : classesFundo += this + ' ';
            case 'red' : classesFundo += this + ' ';
            default : classes += this + ' '; break;
        }
    });

    let src = ''
    let trigger = "trigger='loop' "
    let delay = "delay='1000' "
    let colors = "colors= 'primary:#121331,secondary:#ffffff' "
    let style= "style= 'width:46px;height:46px'> "

    switch (true) { // determina qual ícone aparecerá no popup de acordo com a string passada na variável 'icone'
      case icone == 'sucesso':
        src = "src='https://cdn.lordicon.com/lupuorrc.json' "
        break;
      case icone == 'falha':
            src = "src= 'https://cdn.lordicon.com/tdrtiskw.json' "
            break;
      case icone == 'carregar':
            src = "src= 'https://cdn.lordicon.com/dpinvufc.json' "
            delay = "delay = '10' "
            colors = " colors= 'primary:#ffffff,secondary:#ffffff' "
            break;
    }
  
    let popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    let janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div>"+"<lord-icon " + src + trigger + delay + colors + style + "</lord-icon><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
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

function abrirjanela(cor, texto, titulo, trigger){ // trigger é usado para sinalizar qual ícone vai ser usado
      icone = trigger
      janelaPopUp.abre( "asdf", 'p' + " "  + cor + ' ' + 'alert',  titulo ,  texto)
}