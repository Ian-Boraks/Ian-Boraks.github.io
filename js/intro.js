let nameElement = document.querySelector("#name");
let nameHolder = document.querySelector("#name-holder");

let keyFrames = [
    {t: " ", ms: 200},
    {t: "•", ms: 200},
    {t: " ", ms: 200},
    {t: "•", ms: 200},
    {t: " ", ms: 200},
    {t: "•", ms: 200},
    {t: " ", ms: 200},
    {t: "•", ms: 200},
    {t: "I", ms: 100},
    {t: "IA", ms: 100},
    {t: "IAN", ms: 100},
    {t: "IAN ", ms: 100},
    {t: "IAN B", ms: 100},
    {t: "IAN BO", ms: 100},
    {t: "IAN BOR", ms: 100},
    {t: "IAN BORA", ms: 100},
    {t: "IAN BORAK", ms: 100},
    {t: "IAN BORAKS", ms: 100},
    {t: "IAN BORAKS", ms: 200},
    {t: "IAN BORAKS", ms: 200},
    {t: "IAN BORAKS", ms: 200},
    {t: "IAN BORAKS", ms: 200},
    {t: "IAN BORAKS", ms: 200},
    {t: "IAN BORAKS", ms: 200}
];

let stepDenominator = 1;

let i = 0;

let update = () => {
    let step = keyFrames[i];
    nameElement.innerText = step.t;
    i++;

    if (i < keyFrames.length)
        setTimeout(update, step.ms / stepDenominator);
    else {
        nameHolder.classList.add('top');
        nameHolder.classList.remove('center-screen')
    }
}

let dotHolder = document.querySelector("#dot-holder");

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
}, 2300);

setTimeout(() => {
    let body = document.querySelector("body");
    body.classList.add("background-color-dark");
    body.classList.remove("background-color-light");
    children[0].classList.add("disappear");
    update();
}, 3100);