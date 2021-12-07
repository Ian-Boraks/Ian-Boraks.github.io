filterSelection("all");
function filterSelection(c) {
	var x, i, master;
	x = document.getElementsByClassName("media");
	master = document.getElementById("master");

	if (c == "all") {
		c = "";
		w3RemoveClass(master, "filtered");
	} else {
		w3AddClass(master, "filtered");
	}
	for (i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
	expandCol();
}

function expandCol() {
	var x, i, content;
	x = document.getElementById("master");

	w3RemoveClass(x, "oneCol");
	w3RemoveClass(x, "twoCol");
	w3RemoveClass(x, "threeCol");

	var showing;
	showing = x.getElementsByClassName("show");
	switch (showing.length) {
		case 1:
			w3AddClass(x, "oneCol");
			break;
		case 2:
			w3AddClass(x, "twoCol");
			break;
		case 3:
			w3AddClass(x, "threeCol");
			break;
	}
}

function w3AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

function w3RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}
