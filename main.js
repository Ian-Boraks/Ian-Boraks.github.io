let titleHolder = document.querySelector("#title-block");
let navHolder = document.querySelector("#nav-block");
let body = document.querySelector("body");
let dotHolder = document.querySelector("#dot-holder");
var $projects = $("#projects");

showdown.setFlavor('github');


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

function loadFromURL(debug) {
    var params = new window.URLSearchParams(window.location.search);
    if (params.has("project")) {
        navHolder.classList.remove("disappear");
        $("#dot-holder").remove();
        $(body).removeClass("background-color-light");
        $(body).addClass("background-color-dark");

        loadProject(params.get("project"));
        return true;
    }

    return false;
}

window.onpopstate = function (event) {
    // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if (event.state) {
        // Simulate the loading of the previous page
        switch (event.state) {
            case 'project':
            case 'home':
                location.assign('/');
                break;
            case 'projectLanding':
                loadProject('default', false);
                break;
            default:
                break;
        }
    };
};

$(document).ready(() => {
    if (!loadFromURL('documentready')) {
        createDots();
        animateDots();
    };
});

async function loadDefault() {
    var projectsDict = {};

    await $.getJSON("/projects/projects.json", function (data) {
        projectsDict = data;
    }).fail(function () {
        console.log("An error has occurred.");
    });

    defaultMD = "# Select a project to view: \n\n";

    for (const [key, value] of Object.entries(projectsDict)) {
        defaultMD += `## ${value.name}: ${value.date}\n`;
        defaultMD += `- [${value.url}](${value.url})\n\n`;
    }

    var converter = new showdown.Converter(),
        text = defaultMD,
        html = converter.makeHtml(text);

    $projects.html(html);

    for (const [key, value] of Object.entries(projectsDict)) {
        tempProject = $('#' + key);
        tempProject.click(function () {
            loadProject(key);
        });
        tempProject.addClass("projectLink");
        tempProject.html("<span class='material-symbols-outlined'>web_traffic</span> " + value.name)
    }
}

function loadProjectNavButton() {
    if (window.history.state == 'project') {
        history.back();
    }
}

function loadProject(project = 'default', pushState = true) {
    if (pushState && (project != 'default' && window.history.state != 'project')) {
        history.pushState(project == 'default' ? 'projectLanding' : 'project',
            document.title, "?project=" + project);
    }

    if (project == 'default') {
        loadDefault();
    } else {
        jQuery.get('/projects/markdown/' + project + '.md', function (data) {
            var converter = new showdown.Converter(),
                text = data,
                html = converter.makeHtml(text);

            $projects.html(html);
        }, 'text');
    }

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

function openProjects() {
    history.pushState('projectLanding',
        document.title, "?project=default");

    loadDefault();

    $('#project-button-1').addClass("disappear");
    $('#project-button-2').removeClass("disappear");

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

history.replaceState('home',
    document.title, document.location.href);