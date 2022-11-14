$(document).ready(function () {
  $('.top-nav-button').each(function (key, value) {
    let id = '#top-nav-' + value.innerText.toLowerCase()
    $(id).click(function () {
      $('.top-nav-button').each(function (key1, value1) {
        $(value1).removeClass('active');
      });

      $(value).addClass('active');

      $('html,body').animate({
        scrollTop: $('#' + value.innerText.toLowerCase()).offset().top - 65
      },
        'medium');
    });
  });
});

setInterval(() => {
  var t = dayjs().diff(dayjs(1094443200000), 'year', true);
  $('#age').text(t.toString().substring(0, 12));
}, 60);

