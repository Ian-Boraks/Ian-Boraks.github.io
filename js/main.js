let navProjects = document.getElementById('nav-projects');
let navAbout = document.getElementById('nav-about');
let navContact = document.getElementById('nav-contact');
// let navResume = document.getElementById('nav-resume');

let navButtons = [
    navProjects,
    navAbout,
    navContact,
    // navResume
];

let projects = document.getElementById('projects');
let about = document.getElementById('about');
let contact = document.getElementById('contact');

let sections = [
    projects,
    about,
    contact
];

let navBar = document.getElementById('nav-bar');
// let nameHolder = document.getElementById('name-holder');

for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function () {
        navBar.classList.add('top');
        navBar.classList.remove('center-screen');
        nameHolder.classList.add('top');
        nameHolder.classList.remove('center-screen');

        for (let j = 0; j < sections.length; j++) {
            sections[j].classList.add('hide');
            sections[j].classList.remove('active');
        }

        sections[i].classList.remove('hide');
        sections[i].classList.add('active');
    });
}