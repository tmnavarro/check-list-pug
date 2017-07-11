/**
 * Validaçao de formulários
 * ---------------------------------------
*/
function validate(input, type, message) {
  var defMesage = message == undefined ? 'Campo obrigatório' : message;
  switch (type) {
    case 'numero':

      break;
    default:
      if (input.val() == '') {
        input.parent().append(`<span class="danger">${defMesage}</span>`);
        return true;
      }
  }
  input.parent().find('.danger').remove();
  return false;
}

$(document).ready(function() {
  // init geral functions
});
