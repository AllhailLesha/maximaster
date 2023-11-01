function generateRandomColor() {
    let red   = generateRandomNumber();
    let green = generateRandomNumber();
    let blue  = generateRandomNumber();

    let block = document.getElementById("change-block");
    block.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function changeBlockSize() {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    var div = document.getElementById("change-block");
    div.style.width = width + "px";
    div.style.height = height + "px";
}



