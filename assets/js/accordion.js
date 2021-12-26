var acc = document.getElementsByClassName("accordion");

function closeActive(currElem) {
  var active = document.getElementsByClassName("active");
  for (var i = 0; i < active.length; i++) {
    if (active[i] != currElem) {
      active[i].dispatchEvent(new Event("click"));
    }
  }
}

// Modified from: https://www.w3schools.com/howto/howto_js_accordion.asp
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", 
    function() {
      closeActive(this);
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
   }
  );
}