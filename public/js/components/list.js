$(document).ready(function() {

  /**
   * Voltar para lista
   * ---------------------------------------
  */
  $(document).on('click', '#backList', function() {
    console.log('ols');
    $('.component-box').first().removeClass('disable').addClass('active');
    $('.component-box.part-2').removeClass('active').addClass('disable');
  });

});
