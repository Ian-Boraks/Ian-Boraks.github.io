document.addEventListener('DOMContentLoaded', function () {
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
}, false);