//Obtener los botones tipo submit
let submitButton = $('button[type=submit]');

//Agregar el listener para el submit
submitButton.on('click',validateForm);
