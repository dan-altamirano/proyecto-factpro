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

    if($form.attr("id") == "signup")
    {
      swal("¡Genial!", "¡Ahora eres miembro de FactPro!", "success")
    }

    if($form.attr("id") == "agregar")
    {
      swal("¡Bien!", "Agregado correctamente", "success")
    }

    if($form.attr("id") == "modificar")
    {
      swal("¡Bien!", "Modificado correctamente", "success")
    }

    if($form.attr("id") == "ctcform")
    {
      swal("¡Hemos recibido tu información!", "¡Gracias! En breve nos pondremos en contacto contigo", "success")
    }

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

let doAnAction =  function doAnAction(e){
  let $button = $(this);

  if($button.attr("name") == "eliminar")
  {
    swal({
    title: "¿Estas seguro?",
    text: "¡Una vez eliminado, no podrás recuperar el registro!",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("¡El registro ha sido eliminado!", {
        icon: "success",
      });
    } else {
      swal("Eliminación Cancelada");
    }
  });
  }
  if($button.attr("name") == "cancelar")
  {
    swal({
    title: "¿Estas seguro?",
    text: "¡Una vez cancelada, no podrás revertirlo!",
    icon: "warning",
    buttons: ["Salir", "Cancelar factura"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("¡La factura ha sido cancelada!", {
        icon: "success",
      });
    } else {
      swal("Operacion cancelada");
    }
  });
  }
  else {

    if($button.attr("name") == "finInventario")
    {
      swal("Inventario Terminado", "¡Información almacenada correctamente!", "success")
    }
    else {
      if($button.attr("name") == "editInventario")
      {
        swal("Inventario Modificado", "¡Información actualizada correctamente!", "success")
      }
      else
      {
          // Add counter
          let $tb = $("#inventory tr:first th:last").html();

          if($tb != "EXISTENTES")
          {
            $("#inventory tr:first").append("<th class='titulo' id='exist'>EXISTENTES</th>");

            $("#inventory tr:gt(0)").append("<td id='exists'>0</td>");


            let $tr = $button.parents('tr');
            let $value = $tr.find('input').val();

            if($value == "")
            {
              $value = "0";
            }

            if($value > 0)
            {
              let $th = $tr.find('td#exists').text($value);
            }

          }
          else {
              let $tr = $button.parents('tr');
              let $value = $tr.find('input').val();
              let $th = $tr.find('td#exists').html();

              if($value == "")
              {
                $value = "0";
              }
              if($value > 0)
              {
                let valor = parseFloat($value) + parseFloat($th);
                $tr.find('td#exists').text(valor);
              }

          }
      }

    }

  }
}
