$(function(){

    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#data').mask('00/00/0000');

    $(function(){
      $("#cpf").blur(function(){
          validarCpf(this);
      })
      $("#email").blur(function(){
          validarEmail(this);
      })
      $("#data").blur(function(){
          validarData(this);
      })
  });


});

function resetar(){
  $(".is-invalid ").removeClass("is-invalid ");
}


function enviar(){

  erro = false;
  $("input, select").each(function(k,el){
      if (!validaPreenchimento(el)){
          erro = true;
      }
  });

  if (!validarCpf($("#cpf"))){
      erro = true;
  }
  if (!validarData($("#data"))){
    erro = true;
}

if (!validarEmail($("#email"))){
    erro = true;
}

if (erro == false){
    $("#form").submit();
}
}


function validaPreenchimento(el){
  if ($(el).val() != ""){
      $(el).removeClass("is-invalid ");
      return true;
  } else {
      $(el).addClass("is-invalid ");
      return false;
  }
}

function validarData(el){

  data = $(el).val();
  if (_isValidData(data)){
      $(el).removeClass("is-invalid ");
      return true;
  } else {
      $(el).addClass("is-invalid ");
      return false;
  }

}

function validarEmail(el){

  data = $(el).val();
  if (_isValidEmail(data)){
      $(el).removeClass("is-invalid ");
      return true;
  } else {
      $(el).addClass("is-invalid ");
      return false;
  }

}


function validarCpf(el){

    cpf = $(el).val().replace(".","").replace(".","").replace("-","");
    if (_isValidCPF(cpf)){
        $(el).removeClass("is-invalid ");
        return true;
    } else {
        $(el).addClass("is-invalid ");
        return false;
    }

}



function _isValidEmail(email) {
    if (email == ""){
        return false;
    }
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
  }

function _isValidCPF(number) {
    var sum;
    var rest;
    sum = 0;
    if (number == "00000000000") return false;

    for (i=1; i<=9; i++) sum = sum + parseInt(number.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(number.substring(9, 10)) ) return false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(number.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(number.substring(10, 11) ) ) return false;
    return true;
}

function _isValidData(data){
    reg = /[^\d\/\.]/gi;                  // Mascara = dd/mm/aaaa | dd.mm.aaaa
    var valida = data.replace(reg,'');    // aplica mascara e valida só numeros
    if (valida && valida.length == 10) {  // é válida, então ;)
      var ano = data.substr(6),
        mes = data.substr(3,2),
        dia = data.substr(0,2),
        M30 = ['04','06','09','11'],
        v_mes = /(0[1-9])|(1[0-2])/.test(mes),
        v_ano = /(19[1-9]\d)|(20\d\d)|2100/.test(ano),
        rexpr = new RegExp(mes),
        fev29 = ano % 4? 28: 29;

      if (v_mes && v_ano) {
        if (mes == '02') return (dia >= 1 && dia <= fev29);
        else if (rexpr.test(M30)) return /((0[1-9])|([1-2]\d)|30)/.test(dia);
        else return /((0[1-9])|([1-2]\d)|3[0-1])/.test(dia);
      }
    }
    return false                           // se inválida :(
  }