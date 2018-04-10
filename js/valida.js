let validateForm = function validateForm(e){
  let $button = $(this);
  let pristine = true;
  //Obtain form
  let $form = $button.parents('form');

  //Obtatin required elements
  let $required = $form.find('*[required]'); //Input / *
  let $pattern = $form.find('*[pattern]');

  pristine = validateRequiredFields($required);
  pristine = validatePatternFields($pattern);

  if(pristine){
    swal("¡Gracias!", "¡Ahora eres miembro de FactPro!", "success");
    //form.submit();
  }

  //Obtain any other element

  //Validate required elements

  e.preventDefault(); //Don't execute

}

let validateRequiredFields = function validateRequiredFields(fields){
    //console.log(fields);
    let pristine = true;

    $.each(fields, function() {
      let element = $(this);


      if(element.is('input') && element.val() === '')
      {
        generateError(element, 'required');
        pristine = false;
      }

      if(element.is('select') && element.val() === 0) //Marcar selected en 0 value
      {
        generateError(element, 'required');
        pristine = false;
      }



      //console.log(element);
    });

    return pristine;
}


let validatePatternFields = function validatePatternFields(fields){
    //console.log(fields);
    let pristine = true;

    $.each(fields, function() {
      let element = $(this);
      let regex = element.attr('pattern');

      if(!element.val().match(regex)){
        generateError(element,'do not match the format');
        pristine = false;
      }

      //console.log(element);
    });

    return pristine;
}



let generateError = function generateError(element, typeError){
  //alert('This ' + element + ' field is ' + typeError);
  element.addClass('error');
  $('<span class="errorMessage">This field is ' + typeError + '</span>').insertAfter(element);
}
