$(document).ready(function () {
  document.querySelectorAll('.button').forEach(button => {
    $(button).click(function () {
      document.querySelectorAll('.button').forEach(button => {
        $(button).removeClass('active');
        $('#' + button.innerText).removeClass('active');

      });
      $(this).addClass('active');
      $('#' + this.innerText).addClass('active');
    });
  });
});