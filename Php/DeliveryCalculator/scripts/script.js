const queriesHistory = {};

function getCitysList() {
    fetch("http://delivery-calculator/form.php", {
    }) 
    .then(response => response.json())
    .then(citys => createCitysSelect(citys))
    .catch(error => console.error(error))
}

function createCitysSelect(citys) {
    let select = document.getElementById('formSelect');

    citys.forEach(city => {
        let option = createOptionForCitysSelect(city);
        if (city == "Москва") {
            option.selected = true;
        }
        select.prepend(option);
    });
}

function createOptionForCitysSelect(city) {
    let option = document.createElement('option');
    option.className = 'select__option';
    option.textContent = city;

    return option;
}

function sendForm() {
    const formData = new FormData(document.getElementById('form'));
    fetch("http://delivery-calculator/citys.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => document.getElementById('mainBlock').textContent = data.message)
    .catch(error =>  console.error(error));
}

document.getElementById('form').addEventListener("submit", function(event) {
    event.preventDefault();
    sendForm();
})

getCitysList();
