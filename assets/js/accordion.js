var acc = document.getElementsByClassName("accordion");

function closeActive(currElem) {
  var active = document.getElementsByClassName("active");
  for (var i = 0; i < active.length; i++) {
    if (active[i] != currElem) {
      active[i].dispatchEvent(new Event("click"));
    }
  }
}

function scrollToPanel(panel) {
  console.log("scrolling to panel");
  panel.scrollIntoView({ block: "end", inline: "nearest" });
}

function accordionToggle(currElem) {
  closeActive(currElem);
  currElem.classList.toggle("active");
  var panel = currElem.nextElementSibling;
  if (panel.classList.contains("panel")) {
    panel.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      // setTimeout(scrollToPanel, 500, panel);
    }
  } else {
    console.log("no panel!");
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