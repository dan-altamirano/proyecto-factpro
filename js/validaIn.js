let validateForm = function validateForm(e){
  let $button = $(this);
  //Obtain form
  let $form = $button.parents('form');

  //Obtatin required elements
  let $required = $form.find('*[required]');

  pristineP = validatePatternFields($required);

  e.preventDefault(); //Don't execute
}

let validatePatternFields = function validatePatternFields(fields){
    let pristine = true;

    $.each(fields, function() {
      let element = $(this);
      let user = 'dan';
      let password = 'altamirano'
      if (element.attr("id") == 'username') {
        if(!element.val().match(user)){
          generateError(element,'usuario o contraseña incorrecto', element.attr("name"));
          pristine = false;
        }
      }
      if (element.attr("id") == 'pass') {
        if(!element.val().match(password)){
          generateError(element,'usuario o contraseña incorrecto', element.attr("name"));
          pristine = false;
        }
      }
    });
    return pristine;
}

let generateError = function generateError(element, typeError, typeInfo){

  if(element.attr("class") != "inputc error")
  {
    element.addClass('error');
    $('<span id = "' + typeInfo + '" class="errorMessage">Error, ' + typeError + '</span>').insertAfter(element);
  }
}
