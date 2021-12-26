// Modified from https://stackoverflow.com/a/63781543​
x = document.getElementsByClassName("colCaption");
for (i = 0; i < x.length; i++) {
    const wrapText = x[i];
    wrapText.innerHTML = wrapText.textContent.split(' ').map(function (y) {
    return '<span>' + y + '</span>';
    }).reverse().join('');
}