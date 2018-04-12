let validateForm = function validateForm(e){
  let $button = $(this);
  let pristineR = true;
  let pristineP = true;
  let date = new Date();
  //Obtain form
  let $form = $button.parents('form');

  //Obtatin required elements
  let $required = $form.find('*[required]'); //Input / *
  let $pattern = $form.find('*[pattern]');

  pristineR = validateRequiredFields($required, date);
  pristineP = validatePatternFields($pattern);

  if(pristineR && pristineP){
    swal("¡Genial!", "¡Ahora eres miembro de FactPro!", "success")

  }

  e.preventDefault(); //Don't execute

}


let getAge = function getAge(date, birth)
{
    var birthday = new Date(birth);
    var age = date.getFullYear() - birthday.getFullYear();
    var m = date.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && date.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}

let validateRequiredFields = function validateRequiredFields(fields, date){
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

      if(element.is('input') && element.attr("type") == "date")
      {
        let age = getAge(date, element.val());

        if(age < 18)
        {
          swal({
            title: "¡Atención!",
            text: "¡Para poder pertenecer a FactPro debes ser mayor de edad!",
            icon: "warning",
          })
          pristine = false;
        }

      }
    });

    return pristine;
}


let validatePatternFields = function validatePatternFields(fields){
    let pristine = true;

    $.each(fields, function() {
      let element = $(this);
      let regex = element.attr('pattern');

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
