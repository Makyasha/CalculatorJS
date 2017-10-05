/*******************************************************************
Last Information
     0 -> number
     1 -> sign
     2 -> dot
     3 -> ans
     4 -> enter
     5 -> clear

 * After an ENTER, if click any number DISPLAY will rest.
 * Spaming ANS will multiply them

 -- TO DO

  * Fix posibility of negatives
  * Fix first sign input
  * Do not delete everything when Clear (?)
  * Fix Ans beign infinity when number / 0
  * Get fancy

*******************************************************************/
var ans = 0;    // last result
var last = 0;   // last input

/* ON CLICK ANY NUMBER
**
** Check if the last was ENTER (last4)
**    -> If true, then delete everything in DISPLAY and add NUMBER
**    -> If false, then DISPLAY value is its own value and the new NUMBER
**  Set Last as 0 to know that the last input was a NUMBER
*/

$( ".number" ).click(function(event) {
    if(last != 4){
      updateDisplay($( "#display" ).val() + $(event.target).data("number"));
      last = 0;
    } else if (last == 4){
      updateDisplay($(event.target).data("number"));
      last = 0;
    }
});

/* ON CLICK ANY SIGN
**
** Check if the last was SIGN (last1)
**    -> If true, then remplace last SIGN for new SIGN
**    -> If false, then DISPLAY value is its own value and the new SIGN
**  Set Last as 1 to know that the last input was a SIGN
*/

$( ".sign" ).click(function(event) {
  if(last == 1){
    updateDisplay($( "#display" ).val().slice(0,-1) + $(event.target).data("sign"));
    last = 1;
  } else {
    updateDisplay($( "#display" ).val() + $(event.target).data("sign"));
    last = 1;
  }
});

/* ON CLICK DOT
**
** Check if the last wasn't DOT (last2)
**    -> If true, then DISPLAY value is its own value and the new DOT
**    -> If false, nothing
**  Set Last as 2 to know that the last input was a DOT
*/

$( ".dot" ).click(function(event) {
  if(last != 2){
    updateDisplay($( "#display" ).val() + $(event.target).data("dot"));
    last = 2;
  }
});

/* ON CLICK ANS
**
** Check the following
**    -> If DISPLAY is empty, only add ans
**    -> If last wasn't ANS (last3), then DISPLAY value is its own value and the new ANS
**    -> Everything else, then multiply existing DISPLAY value and ANS
**  Set Last as 3 to know that the last input was a ANS
*/

$( ".ans" ).click(function(event) {
  if($( "#display" ).val() === ""){
    updateDisplay(ans);
  } else if(last != 3) {
    updateDisplay($( "#display" ).val()+ans);
  } else {
    updateDisplay($( "#display" ).val()+"*"+ans);
  }
  last = 3;
});

/*  ON CLICK ENTER
**
** Save DISPLAY value in display
** Check if the DISPLAY isn't empty and try to do the evaluation of display
**    -> If success, Set Last as 4, Set ans as evaluation result and set lastForm to see the equation
**    -> If error, show and error and don't delete equation
*/

$( ".enter" ).click(function(event) {
  display = $( "#display" ).val();
    if($( "#display" ).val()!=""){
      try{
        updateDisplay((eval($( "#display" ).val())));
        last = 4;
        ans = $( "#display" ).val();
        fillLastForm(display + " = ");
      } catch(e){
        setError();
      }
    }
});

/*  ON CLICK CLEAR
**
** Check if the last was ENTER (last4) and DISPLAY value is numeric
**    -> If true, set ANS as DISPLAY value and set lastForm to see currect ans
**    -> If false, nothing
**  Set DISPLAY value as empty
**  Set Last as 5 to know that the last input was a CLEAR
*/

$( ".clear" ).click(function(event) {
    if($.isNumeric($( "#display" ).val()) && last == 4 ){
      ans = $( "#display" ).val();
      fillLastForm("Ans = "+ ans);
    }
    updateDisplay("");
    last = 5;
});

/*  KEYPRESS ON DISPLAY
**
** Only allow to click numbers, signs and dots.
*/

$( "#display" ).keypress(function(e) {
  var a = [];
  var k = e.which;

  //Falta cuando mueven agregan un simbolo al lado de otro viejo
  if(k>=48 && k<58 || ((k==43 || k==45 || k==42 || k==47) && !lastInputIsSign() && isEmpty() ) ){
    a.push(k);
  }

  if (!(a.indexOf(k)>=0))
      e.preventDefault();
});

$('html').keyup(function(e){
  //Programar el enter
});

/*  lastInputIsSign
**
** Check if last char in DISPLAY is SIGN
** Return true or false
*/

function lastInputIsSign(){
  last = $( "#display" ).val().slice(-1);
  if(last=="+" || last=="-" || last=="*" || last=="/"){
    return true;
  } else {
    return false;
  }
}

/*  lastInputIsDOT
**
** Check if last char in DISPLAY is DOT
** Return true or false
*/

function lastInputIsDot(){
  last = $( "#display" ).val().slice(-1);
  if(last=="."){
    return true;
  } else {
    return false;
  }
}

/*  isEmpty
**
** Check if DISPLAY value is empty
** Return true or false
*/

function isEmpty(){
  if($( "#display" ).val() != "")
    return true;
  else
    return false;
}

/*  fillLastForm -> e as string to write
**
** Set text in lastForm with the last equation or the value of ans
*/

function fillLastForm(e){
  $( "#lastForm" ).text(e);
}

/*  updateDisplay -> e as string to write
**
** Set value in DISPLAY with the inputs or result of equations
*/

function updateDisplay(e){
  $( "#display" ).val(e);
}

/*  setError
**
** Add the class error to error and remove it after a couple of seconds
** This appear after the try catch in clear, fails
*/

function setError(){
    $( "#error" ).addClass("error");
    setTimeout(function() {
        $( "#error" ).removeClass('error');
    }, 2000);
}
