var JSSwitch = true;

var mouse_monitor = function (e) {
  if (location.href.includes('#JS')) {
    var x = e.pageX;
    var y = e.pageY;

    var positionX = (x / window.innerWidth) * 17;
    var positionY = (y / window.innerHeight) * 17;

    $('#name_content').css('--positionX', positionX);
    $('#name_content').css('--positionY', positionY);
  }
}

$(document).ready(function () {
  $(this).on('mousemove', mouse_monitor);

  $("#name_description_button").click(function () {
    if (location.href.includes('#JS')) {
      history.replaceState(null, '', "#CSS");
      $('.cell').each(function (id, cell) {
        cell.style.zIndex = '2';
      });
      $('#name_description_content').text("Mouse following is done 100% with CSS no JS");
      $('#name_description_button').text("CLICK ME TO FOLLOW WITH JS");

      $('#name_content').removeAttr('style');
      $('#name_content').removeAttr('style');
    } else if (location.href.includes('#CSS')) {
      history.replaceState(null, '', "#JS");
      $('.cell').each(function (id, cell) {
        cell.style.zIndex = '0';
      });
      $('#name_description_content').text("Mouse following is done with JS");
      $('#name_description_button').text("CLICK ME TO FOLLOW WITH CSS");
    } else {
      history.replaceState(null, '', "#CSS");
    }
  });

  if (!location.href.includes('#CSS') ? !location.href.includes('#JS') : location.href.includes('#JS')) {
    history.replaceState(null, '', "#CSS");
  } else if (location.href.includes('#JS')) {
    $('#name_description_button').click();
  }

  if (window.innerWidth < 960) {
    $('#name_description').css('display', 'none');
  }

  for (let i = 0; i < 289; i++) {
    $('#name').append('<div class="cell"></div>');
  }
  $('#name').append('<div id="name_content" class="content">');
  if (window.innerWidth < 960) {
    for (let i = 0; i < 10; i++) {
      $('#name_content').append('<div class="name_followers">Ian</div>');
    }
  } else {
    for (let i = 0; i < 10; i++) {
      $('#name_content').append('<div class="name_followers">Ian Boraks</div>');
    }
  }

  if (location.href.includes('#CSS')) {
    $('#name_description_button').click();
  }

  // console.log(location.href);
});