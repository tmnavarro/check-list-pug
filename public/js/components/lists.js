$(document).ready(function() {
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

  /**
   * Abre/Fecha formulário para add lista
   * ---------------------------------------
  */
  $(document).on('click', '.addList', function() {
    //  Abre forumário
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).find('.fa').addClass('fa-minus-circle').removeClass('fa-plus-circle');
      $('#addList').addClass('active').removeClass('disable');
    }
    // Fecha formulário
    else {
      $(this).removeClass('active');
      $(this).find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
      $('#addList').addClass('disable').removeClass('active');
    }
  });

  /**
   * Salvar Nova lista
   * ---------------------------------------
  */
  $('#btnCreateList').on('click', function() {

    if (validate($('#name'), '')) {
      return false;
    }
    if (validate($('#description'), '')) {
      return false;
    }
    var listInfo = {
      name: $('#name').val(),
      description: $('#description').val(),
    }

    $.ajax({
        url: '/list',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        },
        data: listInfo
    });

  });
  /**
   * Abrir lista
   * ---------------------------------------
  */

  /**
   * Apagar Lista
   * ---------------------------------------
  */

  /**
   * Editar Lista
   * ---------------------------------------
  */

});
