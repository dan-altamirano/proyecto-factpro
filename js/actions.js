//Obtener los botones tipo submit
let submitButton = $('button[type=submit]');
//Agregar el listener para el submit
submitButton.on('click',validateForm);

/*------------ CHANGE DETECTED  --------------*/
// Detecta cambios y elimina la clase error en formularios
var y = $("input");

$.each(y, function() {
  let element = $(this);

  element.change(function(){
      if(element.attr("class") == "inputc error")
      {
        element.removeClass("error");
        let a = element.attr("name");
        a = "span#" + a ;
        $(a).hide();
      }
  });

});

/* ----------- AN ACTION -----------*/
// Detecta ID de botones y muestra SWEET ALERTS
let buttonButton = $('button[type=button]');
buttonButton.on('click',doAnAction);


/* ---------- TABLES  -------------*/
// Agrega lo necesario a tablas
// Las tablas con CHECKBOX deben tener ID "tableSelect"
let table = $('#tableSelect');

$.each(table, function() {
  let element = $(this);
  let id = element.attr("id");

  $('#'  + id + ' tr:first').prepend("<th class='titulo'>X</th>");
  $('#' + id +' tr:gt(0)').prepend("<td><input type='checkbox'/></td>");
});

let selectedCBox = $('input[type=checkbox]');
