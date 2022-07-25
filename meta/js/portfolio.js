$(document).ready(function () {
  history.replaceState(null, '', '#SolidWorks1');

  $('.tab_button').each(function (id, button) {
    $(button).click(function () {
      $('.tab_button').each(function () {
        $(this).removeClass('active');
        $('#' + this.innerText).removeClass('active');
      });
      $(button).addClass('active');
      $('#' + button.innerText).addClass('active');
      history.replaceState(null, '', '#' + button.innerText + $('#' + button.innerText + '_selector .selector_button.active').attr('id').replace(/\D/g, ""));
    });
  });

  $('.selector').each(function (id, selector) {
    var tab_id = '#' + $(selector).closest('.tab').attr('id');
    $(selector).find('.selector_button').each(function (id, button) {
      $(button).click(function () {
        $(tab_id).find('.selector_button').each(function () {
          $(this).removeClass('active');
          this.innerText = 'radio_button_unchecked';
        });
        $(tab_id).find('.inner_tab').each(function () {
          $(this).removeClass('active');
        });
        $(this).addClass('active');
        this.innerText = 'radio_button_checked';
        $(tab_id + ' #tab' + $(button).attr('id').replace(/\D/g, "")).addClass('active');
        history.replaceState(null, '', tab_id + $(button).attr('id').replace(/\D/g, ""));
      });
    });
  });
});