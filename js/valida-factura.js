let validateForm = function validateForm(e){
  let $button = $(this);
  let pristineR = true;
  let pristineP = true;
  //Obtain form
  let $form = $button.parents('form');

  //Obtatin required elements
  let $required = $form.find('*[required]'); //Input / *
  let $pattern = $form.find('*[pattern]');

  pristineR = validateRequiredFields($required);
  pristineP = validatePatternFields($pattern);

  if(pristineR && pristineP){
    swal("¡Genial!", "¡Registro guardado exitosamente!", "success")
  }
  e.preventDefault(); //Don't execute
}

let validateRequiredFields = function validateRequiredFields(fields){
    //console.log(fields);
    let pristine = true;
    $.each(fields, function() {
      let element = $(this);

      if(element.is('input') && element.val() === '')
      {
        generateError(element, 'es requerido', element.attr("name"));
        pristine = false;
      }

      if(element.is('select') && element.val() === 0) //Marcar selected en 0 value
      {
        generateError(element, 'es requerido', element.attr("name"));
        pristine = false;
      }
    });
    return pristine;
}


let validatePatternFields = function validatePatternFields(fields){
    let pristine = true;

    $.each(fields, function() {
      let element = $(this);
      let regex = element.attr('pattern');
      //console.log(regex);
      //console.log(element.val());

      if(!element.val().match(regex)){
        generateError(element,'no va con el formato', element.attr("name"));
        pristine = false;
      }
    });
    return pristine;
}

let generateError = function generateError(element, typeError, typeInfo){
  if(element.attr("class") != "inputc error")
  {
    element.addClass('error');
    $('<span id = "' + typeInfo + '" class="errorMessage">Este campo ' + typeError + '</span>').insertAfter(element);
  }
}
