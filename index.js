let titleHolder = document.querySelector("#title-block");
let navHolder = document.querySelector("#nav-block");
let body = document.querySelector("body");
let dotHolder = document.querySelector("#dot-holder");

var params = new window.URLSearchParams(window.location.search);

let createDots = () => {
    body.style.overflow = "hidden";

    for (let i = 0; i < 200; i++) {
        let element = document.createElement("span");
        element.classList.add("dot");
        element.id = "dot-" + i;
        dotHolder.appendChild(element);
    }

    let children = dotHolder.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let angle = Math.random() * 2 * Math.PI;
        let radius = Math.random() * Math.max(window.innerWidth, window.innerHeight) / 1.2;
        let x = Math.cos(angle) * radius + window.innerWidth / 2;
        let y = Math.sin(angle) * radius + window.innerHeight / 2;
        child.style.left = x + "px";
        child.style.top = y + "px";
        child.style.width = Math.random() * 20 + 10 + "px";
        child.style.height = child.style.width;
        child.style.borderRadius = "50%";
    }
}

let animateDots = () => {
    let children = dotHolder.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        setTimeout(() => {
            child.classList.add("move-in");
        }, 1000);

        if (i == 0) continue;

        setTimeout(() => {
            child.classList.add("disappear");
        }, 2100);
    }

    setTimeout(() => {
        children[0].classList.add("expand");
        navHolder.classList.remove("disappear");
        titleHolder.classList.remove("disappear");
        setTimeout(() => {
            $("#dot-holder").remove();
            $(body).removeClass("background-color-light");
            $(body).addClass("background-color-dark");
        }, 600)
    }, 2300);
}

function addState(id) {
    let stateObj = {id: "100"};

    window.history.pushState(stateObj,
        id, "?project=" + id);
}

showdown.setFlavor('github');
var $projects = $("#projects");

function loadProject(project = 'default') {
    addState(project);

    jQuery.get('/markdown/' + project + '.md', function (data) {
        var converter = new showdown.Converter(),
            text = data,
            html = converter.makeHtml(text);

        $projects.html(html);
    }, 'text');

    titleHolder.classList.add("disappear");
    navHolder.classList.add("show-projects");

    setTimeout(() => {
        $("#projects-block").removeClass("disappear");
        setTimeout(() => {
            mermaid.run();
            hljs.highlightAll();
        }, 100);
    }, 400);
}

if (params.has("project")) {
    navHolder.classList.remove("disappear");
    $("#dot-holder").remove();
    $(body).removeClass("background-color-light");
    $(body).addClass("background-color-dark");

    loadProject(params.get("project"));
} else {
    createDots();
    animateDots();
}