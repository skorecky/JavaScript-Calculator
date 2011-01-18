$(function(){
  $("button").click(function(){
    if($(this).attr("id") == "plusmin"){
      var currentDisplay = $("#display").val();
      if($("#display").val().match(/[-]/) == "-"){
        $("#display").val(currentDisplay.replace(/[-]/,""))
      } else {
        $("#display").val("-"+currentDisplay)
      }
    } else {
      updateCalculator($(this).val());
    }
  })
   window.onkeydown = function(e) {
     if($("#display").is(":focus")) {
       $("#display").blur();
     }
      var keyID = e.which;
      switch(keyID)
      {
        case 49:
          var keyValue = 1
          break;
        case 50:
          var keyValue = 2
          break;
        case 51:
          var keyValue = 3
          break;
        case 52:
          var keyValue = 4
          break;
        case 53:
          var keyValue = 5
          break;
        case 54:
          var keyValue = 6
          break;
        case 55:
          var keyValue = 7
          break;
        case 56:
          var keyValue = 8
          break;
        case 57:
          var keyValue = 9
          break;
        case 48:
          var keyValue = 0
          break;
        case 61:
          var keyValue = "="
          break;
        case 13:
          var keyValue = "="
          break;
        case 187:
          var keyValue = "+"
          break;
        case 189:
          var keyValue = "-"
          break;
        case 88:
          var keyValue = "×"
          break;
        case 191:
          var keyValue = "÷"
          break;
        case 8:
          var keyValue = "C"
          break;
        case 27:
          var keyValue = "C"
          break;
        case 67:
          var keyValue = "C"
          break;
        case 91:
          var keyValue = "C"
          break;
      }
      updateCalculator(keyValue);
      if((e.which === 8) || (e.which === 65)){
        return false;
      }
	  };
});

function updateCalculator(element){
  var currentDisplay = $("#display").val();
  var elementValue = element
  $("button[value="+element+"]").addClass("pressed");
  setTimeout("$('.pressed').removeClass('pressed')", 200);
  if(element === "C") {
    $("#display").val("0");
  } else if(element === "=") {
    var total = eval(escape(currentDisplay.replace(/[×]/g,'*').replace(/[÷]/g,'/').replace(/[,]/g,'')))
    $("#display").val(addCommas(total));
  } else if(element != undefined) {
    if($("#display").val() === "0"){
      $("#display").val("")
      var currentDisplay = $("#display").val();
    } else if ($("#display").val() === "-0"){
      $("#display").val("-")
      var currentDisplay = $("#display").val();
    }
    $("#display").val(currentDisplay+element);
  }
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}