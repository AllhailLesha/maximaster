
function gettingJsonData() {
    fetch("http://product-table/server.php")
        .then(response => response.json())
        .then((jsonData) => populateTable(jsonData))
        .catch(error => console.error(error));
}

function populateTable(products) {
    let id = 0;
    let tableBody = document.querySelector('.product tbody');

    tableBody.innerHTML = "";

    products.forEach(product => { 
        if (searchProducts(product.price)) {

            let row = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = ++id;
            row.appendChild(idCell);

            let nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);

            let quantityCell = document.createElement('td');
            quantityCell.textContent = product.quantity;
            row.appendChild(quantityCell);

            let priceCell = document.createElement('td');
            priceCell.textContent = product.price;
            row.appendChild(priceCell);

            let totalPriceCell = document.createElement('td');
            totalPriceCell.textContent = product.quantity * product.price;
            row.appendChild(totalPriceCell);

            tableBody.appendChild(row);
        }
    });
}

function searchProducts(price) {
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;
    let error = document.getElementById('error');
    error.innerHTML = "";

    if ((from === "" || to === "") || (from == 0 && to == 0) || (price >= from && price <= to)) {
        return true;
    } else {
        error.innerHTML = "Нет данных, попадающих под условие фильтра";
        return false;
    }
}


document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    gettingJsonData();
})




