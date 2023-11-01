/* Работа с строками */
function addLineToTable() {
    let tableBody = document.querySelector('.table tbody');

    let row = document.createElement('tr');
    row.className = 'table__row';

    for(let i = 0; i < findCellsCount(); i++) {
        let cellTable = createCell();
        let input = createInput();
        cellTable.appendChild(input);
        row.appendChild(cellTable);
        }
    tableBody.appendChild(row);
    clickOnInput();
}

function removeLineFromTable() {
    let rows = document.querySelectorAll('tr');
    let row = rows[rows.length - 1]; 
    if (checkLineInput(row) === 0) { 
        if (rows.length === 1) {
            alert("Удалить последюю строку нельзя");
        } else {
            row.remove();
        }
    } else if (getResponseByLine()) {
        if (rows.length === 1) {
            alert("Удалить последюю строку нельзя");
        } else {
            row.remove();
        }
    }
} 

/* Работа с колонками */
function addColumsToTable() {
    [].forEach.call(document.querySelectorAll('.table tr'), function(rows) {
        let cellTable = createCell();
        let input = createInput();
        cellTable.appendChild(input);
        rows.appendChild(cellTable);
    })
    clickOnInput();
}

function removeColumsFromTable() {
    let countCells = findCellsCount();
    let tableBody = document.querySelector('.table__body');
    if (checkInputColum() === 0) {
        if (countCells === 1) {
            alert("Удалить последний столбец нельзя");
        } else {
            for(let row of tableBody.rows) {
                row.cells[countCells - 1].remove();
           }
        }
    } else if (getResponseByColum()){
        if (countCells === 1) {
            alert("Удалить последний столбец нельзя");
        } else {
            for(let row of tableBody.rows) {
                row.cells[countCells - 1].remove();
           }
        }
    }
}

function createCell() {
    let cellTable = document.createElement('td');
    cellTable.className = 'table__cell';
    return cellTable;
}

function createInput() {
    let newInput = document.createElement('input');
    newInput.className = 'table__cell__input';
    newInput.type = 'text';
    newInput.disabled = true;

    return newInput;
}

function findCellsCount() {
    return document.querySelector('.table__body').rows[0].cells.length;
}

function checkLineInput(row) {
    let index = 0;
    for (let i = 0; i < row.cells.length; i++) {
        let input = row.cells[i].querySelector('input');
        if (input.value !== "") {
            index++;
        } 
    }
    return index;
}

function checkInputColum() {
    let index = 0;
    let rows = document.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let lastCell = row.cells[row.cells.length - 1];
        let input = lastCell.querySelector('input');
        if (input.value !== "") {
            index++;
        }
    } 
    return index;
}

function getResponseByLine() {
    return confirm("В данной строке имеются заполненные ячейки. Вы уверены, что хотите их удалить?");
}

function getResponseByColum() {
    return confirm("В данной колонке имеются заполненные ячейки. Вы уверены, что хотите их удалить?");
}

/* Block with table button*/
const addLine = document.querySelector('.add-line__button');
addLine.addEventListener('click', function(event) {
    event.preventDefault();
    addLineToTable();
});

const removeLine = document.querySelector('.remove-line__button');
removeLine.addEventListener('click', function(event) {
    event.preventDefault();
    removeLineFromTable();
});

const addColum = document.querySelector('.add-columns__button');
addColum.addEventListener('click', function(event) {
    event.preventDefault();
    addColumsToTable();
});

const removeColum = document.querySelector('.remove-columns__button');
removeColum.addEventListener('click', function(event) {
    event.preventDefault();
    removeColumsFromTable();
});

function clickOnInput() {
    let inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.addEventListener('dblclick', function() {
            input.placeholder = '123';
            input.style.border = '1px solid';
            this.disabled = false;
            
            this.select();
        })
        input.onblur = function() {
            this.disabled = true;
            input.style.border = 'none';
            input.placeholder = '';
            localStorage.setItem('input: ' + (i + 1), input.value);
        }
    }
}

clickOnInput();
