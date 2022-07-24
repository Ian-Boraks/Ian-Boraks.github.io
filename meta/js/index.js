// document.addEventListener('DOMContentLoaded', function () {

// }, false);

var JSSwitch = true;

var mouse_monitor = function (e) {
  if (location.href.includes('#JS')) {
    var x = e.pageX;
    var y = e.pageY;

    var positionX = (x / window.innerWidth) * 17;
    var positionY = (y / window.innerHeight) * 17;

    document.getElementById('name_content').style.setProperty('--positionX', positionX);
    document.getElementById('name_content').style.setProperty('--positionY', positionY);
  }
}

$(document).ready(function () {
  $(this).on('mousemove', mouse_monitor);

  $("#name_description_button").click(function () {
    if (location.href.includes('#JS')) {
      location.href = location.href.replace('#JS', '#CSS');
      document.querySelectorAll('.cell').forEach(cell => {
        cell.style.zIndex = '2';
      });
      document.getElementById('name_description_content').textContent = "Mouse following is done 100% with CSS no JS";
      document.getElementById('name_description_button').textContent = "CLICK ME TO FOLLOW WITH JS";

      document.getElementById('name_content').style.removeProperty('--positionX');
      document.getElementById('name_content').style.removeProperty('--positionY');
    } else if (location.href.includes('#CSS')) {
      location.href = location.href.replace('#CSS', '#JS');
      document.querySelectorAll('.cell').forEach(cell => {
        cell.style.zIndex = '0';
      });
      document.getElementById('name_description_content').textContent = "Mouse following is done with JS";
      document.getElementById('name_description_button').textContent = "CLICK ME TO FOLLOW WITH CSS";
    } else {
      location.href = location.href + '#CSS';
    }
  });

  if (!location.href.includes('#CSS') ? !location.href.includes('#JS') : location.href.includes('#JS')) {
    location.href = location.href + '#CSS';
  } else if (location.href.includes('#JS')) {
    document.getElementById('name_description_button').click();
  }

  if (window.innerWidth < 960) {
    document.getElementById('name_description').style.display = 'none';
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
});