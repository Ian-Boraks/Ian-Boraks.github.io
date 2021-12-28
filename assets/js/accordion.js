var acc = document.getElementsByClassName("accordion");

function closeActive(currElem) {
  var active = document.getElementsByClassName("active");
  for (var i = 0; i < active.length; i++) {
    if (active[i] != currElem) {
      active[i].dispatchEvent(new Event("click"));
    }
  }
}

function scrollToTargetAdjusted(panel) {
  var headerOffset = 20;
  var elementPosition = panel.getBoundingClientRect().bottom;
  var offsetPosition = elementPosition + headerOffset;

  window.scrollTo({
    bottom: offsetPosition,
    behavior: "smooth"
  });
}

function accordionToggle(currElem) {
  closeActive(currElem);
  currElem.classList.toggle("active");
  var panel = currElem.nextElementSibling;

  // This stops a crash bug and makes sure the panel is there and that it is actually a panel
  if (panel && panel.classList.contains("panel")) {
    panel.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = (panel.scrollHeight + 10) + "px";
      // TODO: Add scroll to target for drop downs for QOL
      // setTimeout(scrollToTargetAdjusted, 100, panel);
    }
  }
}

// Modified from: 
// https://www.w3schools.com/howto/howto_js_accordion.asp
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click",
    function () { accordionToggle(this); }
  );

  // This is for accessibility so that the user can tab to the 
  // accordion and then press enter to toogle.
  acc[i].addEventListener("keypress",
    function (e) {
      if (e.key === "Enter") {
        accordionToggle(this);
      }
    }
  );
}