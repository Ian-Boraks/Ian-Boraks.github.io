addEventListener("resize", (event) => {
  if ($(window).width() < 800) {
    $('.main-content-section').each(function () {
      var children = $(this).children("div");
      if (children.length < 2) {
        return;
      }
      if (children[0].classList.contains('section-secondary') && children[0].classList.contains('left')) {
        children[0].parentNode.insertBefore(children[1], children[0]);
      }
    });
  } else {
    $('.main-content-section').each(function () {
      var children = $(this).children("div");
      if (children.length < 2) {
        return;
      }
      if (children[0].classList.contains('section-main') && children[0].classList.contains('right')) {
        children[0].parentNode.insertBefore(children[1], children[0]);
      }
    });
  }
});

$(document).ready(function () {
  window.dispatchEvent(new Event('resize'));

  enableClicks();

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

  $("#top-nav-main-content").click(function () {
    $('.top-nav-button').each(function (key1, value1) {
      $(value1).removeClass('active');
    });

    $(this).addClass('active');

    $('html,body').animate({
      scrollTop: $("#main-content").offset().top - 80
    },
      'medium');
  });

  $('.more').each(function (key, value) {
    $('#' + value.id).click(function () {
      $("<a>").prop({
        href: "/projects/" + value.id + ".html"
      })[0].click();
    })
  });
});

function enableClicks() {
  $('#contact-email').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "mailto:ianbor.contact@gmail.com"
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
  $('#contact-resume').click(function () {
    $("<a>").prop({
      target: "_blank",
      href: "/meta/img/About/resume.pdf"
    })[0].click();
  })
}

setInterval(() => {
  var t = dayjs().diff(dayjs(1094443200000), 'year', true);
  $('#age').text(t.toString().substring(0, 12));
}, 60);

