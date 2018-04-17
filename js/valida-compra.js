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
  if($form.attr("id") == "modificar")
  {
    swal("¡Bien!", "Modificado correctamente", "success")
  }
  e.preventDefault(); //Don't execute
}

let validateRequiredFields = function validateRequiredFields(fields){
    //console.log(fields);
    let pristine = true;
    let cantidad = 0;
    let costo = 0;
    let total = 0;

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

      if(element.is('input') && element.attr("type") == "number")
      {
        if (element.attr("id") == "cantidad" && element.val() != 0) {
          cantidad = element.val();
        }
        if (element.attr("id") == "preciounitario" && element.val() != 0) {
          costo = element.val();
        }
        if (element.attr("id") == "preciototal") {
          total = costo * cantidad;
          if (element.val() != total) {
            generateError(element, 'no corresponde al costo total', element.attr("name"));
            pristine = false;
          }
        }
      }

    });
    console.log('total: ' + costo * cantidad);
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
