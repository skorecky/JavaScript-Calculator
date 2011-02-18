// Window.onload is probably no needed since we load the JS at the bottom, 
// but this will insure the document is ready before it loads the js
var display;
var buttons;
var currentDisplay;

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function updateCalculator(element){
  var currentClassName;
  var elementValue = element;
  // var lastChar = currentDisplay.match(/.$/)[0];
  var inputs = document.getElementsByTagName("button");
  currentDisplay = display.value;
  for (var i = 0; i < inputs.length; i ++) {
    if (inputs[i].value === element) {
      currentClassName = inputs[i].className;
      inputs[i].className = "pressed " + currentClassName;
    }
  }
  if (document.getElementsByClassName('pressed').length >= 1) {
    setTimeout(function () {
      var pressedButton = document.getElementsByClassName('pressed')[0]; 
      currentClassName = pressedButton.className.replace(/pressed/,'');
      pressedButton.className = currentClassName;
    }, 100); 
  }
  // if(lastChar === "+" || lastChar === "-" || lastChar === "÷" || lastChar === "×"){
  //   // currentDisplay = currentDisplay.replace(/.$/,"");
  // };
  if(element === "C") {
    display.value = "0";
  } else if(element === "=") {
    // don't yell at me for using eval. This is probably one of the few proper places to use it.
    var total = eval(currentDisplay.replace(/[×]/g,'*').replace(/[÷]/g,'/').replace(/[,]/g,''));
    if(total === Infinity){
      display.value = "You Suck";
      return false;
    }
    display.value = addCommas(total);
  } else if(element !== undefined) {
    if(display.value === "0"){
      display.value = "";
      currentDisplay = display.value;
    } else if (display.value === "-0"){
      display.value = "-";
      currentDisplay = display.value;
    }
    display.value = currentDisplay+element;
  }
}

window.onload = function(){
  var buildClickHandler = function () {
    currentDisplay = display.value;
    return function(){
      if(this.id === "plusmin"){
        if(display.value.match(/[\-]/) === "-"){
          display.value = currentDisplay.replace(/[\-]/,"");
        } else {
          display.value = "-"+currentDisplay;
        }
      } else {
        updateCalculator(this.value);
      }
    };
  };
  
  display = document.getElementById('display');
  buttons = document.getElementsByTagName("button");
  // we need to loop through the calcular buttons and return the one that was clicked.
  
  
  for (var i = 0; i < buttons.length; i ++){
    buttons[i].onclick = buildClickHandler();
  }
  
  // Here we're setting up our key bindings to control the calculator via keyboard
   window.onkeydown = function(e){
     if(document.activeElement === display) {
       display.blur();
     }
      var keyID = e.which;
      var keyValue;
      switch(keyID)
      {
        case 49:
          keyValue = 1;
          break;
        case 50:
          keyValue = 2;
          break;
        case 51:
          keyValue = 3;
          break;
        case 52:
          keyValue = 4;
          break;
        case 53:
          keyValue = 5;
          break;
        case 54:
          keyValue = 6;
          break;
        case 55:
          keyValue = 7;
          break;
        case 56:
          keyValue = 8;
          break;
        case 57:
          keyValue = 9;
          break;
        case 48:
          keyValue = 0;
          break;
        case 61:
          keyValue = "=";
          break;
        case 13:
          keyValue = "=";
          break;
        case 187:
          keyValue = "+";
          break;
        case 189:
          keyValue = "-";
          break;
        case 88:
          keyValue = "×";
          break;
        case 191:
          keyValue = "÷";
          break;
        case 8:
          keyValue = "C";
          break;
        case 27:
          keyValue = "C";
          break;
        case 67:
          keyValue = "C";
          break;
        case 91:
          keyValue = "C";
          break;
      }
      updateCalculator(keyValue);
      if((e.which === 8) || (e.which === 65)){
        return false;
      }
	  };
};