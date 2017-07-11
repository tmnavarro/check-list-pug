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
  function createListItem(data) {
    var item = `<div class="linha">
                  <div class="item">
                    <span>${data.name}</span>
                  </div>
                  <div class="item">
                    <span>${data.createdAt}</span>
                  </div>
                  <div class="item">
                    <span>${data.itens.length}</span>
                  </div>
                  <div class="item">
                    <button class="visit-list" data-id="${data._id}">
                      <div class="fa fa-eye"></div>
                    </button>
                  </div>
                  <div class="item">
                    <button class="edit-list" data-id="${data._id}">
                      <div class="fa fa-edit"></div>
                    </button>
                  </div>
                  <div class="item">
                    <button class="remove-list" data-id="${data._id}">
                      <div class="fa fa-trash"></div>
                    </button>
                  </div>
                </div>`;

    $('.list-title').after(item);

  }

  function clearListItem() {
    $('#name').val('');
    $('#description').val('');
  }

  $(document).on('click', '#btnCreateList', function() {

    if (validate($('#addList #name'), '')) {
      return false;
    }
    if (validate($('#addList #description'), '')) {
      return false;
    }
    var listInfo = {
      name: $('#addList #name').val(),
      description: $('#addList #description').val(),
    }

    $.ajax({
        url: '/list',
        type: 'post',
        dataType: 'json',
        success: function (lists) {
          createListItem(lists);
          clearListItem();

          $(this).removeClass('active');
          $(this).find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
          $('#addList').addClass('disable').removeClass('active');
        },
        error: function (error) {
            console.log(error);
        },
        data: listInfo
    });

  });

  /**
   * Abrir lista
   * ---------------------------------------
  */
  $(document).on('click', '.visit-list', function(){
    var id = $(this).data('id');

    $('.component-box.part-2').load('/templateLists/'+id);
    $('.component-box').first().addClass('disable');
    $('.component-box.part-2').addClass('active');

  });

  /**
   * Apagar Lista
   * ---------------------------------------
  */
  $(document).on('click', '.remove-list', function(){
    var elem = $(this);
    var id = $(this).data('id');

    if (!window.confirm('Deseja realmente apagar esta lista?')) {
      return false;
    }

    $.ajax({
        url: '/list/'+id,
        type: 'delete',
        success: function (list) {
          console.log(list);
          $(elem).parents().eq(1).hide();
        },
        error: function (error) {
            console.log('erro' + error);
        },
    });
  });

  /**
   * Editar Lista
   * ---------------------------------------
  */
  $(document).on('click', '.edit-list', function(){
    var id = $(this).data('id');

    $.ajax({
        url: '/list/'+id,
        type: 'get',
        success: function (list) {
          $('#upList').addClass('active').removeClass('disable');
          $('#upList #name').val(list.name);
          $('#upList #description').val(list.description);
          $('#upList #idList').val(list._id);
        },
        error: function (error) {
            console.log('erro' + error);
        },
    });
  });

  $(document).on('click', '#cancelUpdadeList', function(){
    $('#upList').addClass('disable').removeClass('active');
    $('#upList #name').val('');
    $('#upList #description').val('');
    $('#upList #idList').val('');
  });

  /**
   * Salvar Edição de Lista
   * ---------------------------------------
  */
  $(document).on('click', '#btnUpdadeList', function(){

    if (validate($('#upList #name'), '')) {
      return false;
    }
    if (validate($('#upList #description'), '')) {
      return false;
    }

    var listInfo = {
      name: $('#upList #name').val(),
      description: $('#upList #description').val(),
    }

    $.ajax({
        url: '/list/' + $('#upList #idList').val(),
        type: 'put',
        dataType: 'json',
        success: function (list) {
          $('#upList').removeClass('active').addClass('disable');
          $('#upList #name').val('');
          $('#upList #description').val('')
          $('[data-id='+$('#upList #idList').val()+']').parents().eq(3).remove();
          $('#upList #idList').val('')
          createListItem(list);
        },
        error: function (error) {
            console.log(error);
        },
        data: listInfo
    });
  });




});
