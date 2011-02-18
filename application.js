// Window.onload is probably no needed since we load the JS at the bottom, 
// but this will insure the document is ready before it loads the js
window.onload = function(){
  var display = document.getElementById('display');
  var buttons = document.getElementsByTagName("button");
  // we need to loop through the calcular buttons and return the one that was clicked.
  for (var i = 0; i < buttons.length; i ++){
    buttons[i].onclick = function(){
      if(this.id == "plusmin"){
        var currentDisplay = display.value;
        if(display.value.match(/[-]/) == "-"){
          display.value = currentDisplay.replace(/[-]/,"");
        } else {
          display.value = "-"+currentDisplay;
        }
      } else {
        updateCalculator(this.value);
      }
    }
  }
  
  // Here we're setting up our key bindings to control the calculator via keyboard
   window.onkeydown = function(e){
     if(document.activeElement === display) {
       display.blur();
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
};

// this is where the magic happens.
function updateCalculator(element){
  var currentDisplay = display.value;
  var elementValue = element;
  var lastChar = currentDisplay.match(/.$/)[0];
  var inputs = document.getElementsByTagName("button");
  for (var i = 0; i < inputs.length; i ++) {
    if (inputs[i].value == element) {
      var currentClassName = inputs[i].className
      inputs[i].className = "pressed " + currentClassName;
    }
  }
  if (document.getElementsByClassName('pressed').length >= 1) {
    setTimeout(function () {
      var pressedButton = document.getElementsByClassName('pressed')[0]; 
      currentClassName = pressedButton.className.replace(/pressed/,'');
      pressedButton.className = currentClassName;
    }, 100);
    
  };
  // if(lastChar === "+" || lastChar === "-" || lastChar === "÷" || lastChar === "×"){
  //   // currentDisplay = currentDisplay.replace(/.$/,"");
  // };
  if(element === "C") {
    display.value = "0";
  } else if(element === "=") {
    // don't yell at me for using eval. This is probably one of the few proper places to use it.
    var total = eval(escape(currentDisplay.replace(/[×]/g,'*').replace(/[÷]/g,'/').replace(/[,]/g,'')))
    if(total == "Infinity"){
      display.value = "You Suck"
      return false;
    }
    display.value = addCommas(total);
  } else if(element != undefined) {
    if(display.value === "0"){
      display.value = "";
      var currentDisplay = display.value;
    } else if (display.value === "-0"){
      display.value = "-";
      var currentDisplay = display.value;
    }
    display.value = currentDisplay+element;
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