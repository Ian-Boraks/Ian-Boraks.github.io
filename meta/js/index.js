$(document).ready(function () {
  $('.top-nav-button').each(function (key, value) {
    let id = '#top-nav-' + value.innerText.toLowerCase()
    $(id).click(function () {
      $('.top-nav-button').each(function (key1, value1) {
        $(value1).removeClass('active');
      });

      $(value).addClass('active');

      $('html,body').animate({
        scrollTop: $('#' + value.innerText.toLowerCase()).offset().top - 80
      },
        'medium');
    });
  });

  $('#contact-email').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "mailto::ianbor.contact@gmail.com"
    })[0].click();
  })
  $('#contact-github').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "https://github.com/Ian-Boraks"
    })[0].click();
  })
  $('#contact-linkedin').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "https://www.linkedin.com/in/ian-boraks/"
    })[0].click();
  })
  $('#contact-instagram').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "https://www.instagram.com/ianboraks.photo/"
    })[0].click();
  })
});

setInterval(() => {
  var t = dayjs().diff(dayjs(1094443200000), 'year', true);
  $('#age').text(t.toString().substring(0, 12));
}, 60);

