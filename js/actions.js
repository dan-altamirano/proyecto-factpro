//Obtener los botones tipo submit
let submitButton = $('button[type=submit]');
//Agregar el listener para el submit
submitButton.on('click',validateForm);

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

let buttonButton = $('button[type=button]');
buttonButton.on('click',doAnAction);
