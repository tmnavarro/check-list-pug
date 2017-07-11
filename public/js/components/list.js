$(document).ready(function() {

  /**
   * Voltar para lista
   * ---------------------------------------
  */
  $(document).on('click', '#backList', function() {
    $('.component-box').first().removeClass('disable').addClass('active');
    $('.component-box.part-2').removeClass('active').addClass('disable');
  });

  /**
   * Abre/Fecha formulário para add Item
   * ---------------------------------------
  */
  $(document).on('click', '.addItem', function() {
    //  Abre forumário
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).find('.fa').addClass('fa-minus-circle').removeClass('fa-plus-circle');
      $('#addItem').addClass('active').removeClass('disable');
    }
    // Fecha formulário
    else {
      $(this).removeClass('active');
      $(this).find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
      $('#addItem').addClass('disable').removeClass('active');
    }
  });

  /**
   * Salvar Nova Item
   * ---------------------------------------
  */
  function createListItem(data) {
    var item = `<div class="linha">
                  <div class="item">
                  <div class="checkbox">
                    <label><input type="checkbox" value=""></label></div></div>
                  <div class="item">
                    <strong>Sabão</strong></div>
                  <div class="item">
                    <strong>${data.price}</strong></div>
                  <div class="buttons">
                    <div class="item">
                      <button class="edit-item" data-id="${data.id}">
                        <div class="fa fa-edit"></div>
                      </button>
                    </div>
                    <div class="item">
                      <button class="remove-item" data-id="${data.id}">
                        <div class="fa fa-trash"></div>
                      </button>
                    </div>
                  </div>
                </div>`;

    $('.check-list .list-title').after(item);
  }

  function clearListItem() {
    $('#name').val('');
    $('#description').val('');
  }

  $(document).on('click', '#btnCreateItem', function() {

    if (validate($('#addItem #name'), '')) {
      return false;
    }
    if (validate($('#addItem #price'), '')) {
      return false;
    }
    var itemInfo = {
      name: $('#addItem #name').val(),
      urlImg: $('#addItem #urlImg').val(),
      description: $('#addItem #description').val(),
      price: $('#addItem #price').val(),
    }

    $.ajax({
        url: '/item/'+$('#addItem #idList').val(),
        type: 'post',
        dataType: 'json',
        success: function (item) {
          createListItem(item);
          clearListItem();

          $(this).removeClass('active');
          $(this).find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
          $('#addItem').addClass('disable').removeClass('active');
        },
        error: function (error) {
            console.log(error);
        },
        data: itemInfo
    });
  });

});
