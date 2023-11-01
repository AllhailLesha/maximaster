function validate(form) {
    let error = document.getElementById('error');
    let name = form.querySelector('#name').value;
    let phone = form.querySelector('#phone').value;
    let email = form.querySelector('#email').value;
    let message = form.querySelector('#message').value;

    if (name === "") {
        error.innerHTML = "Поле имени должно быть заполнено";
        return false;
    } if (phone === "") {
        error.innerHTML = "Номер телефона не может быть пустым";
        return false;
    } if (!validatePhone(phone)) {
        error.innerHTML = "Неверно указан номер телефона";
        return false;
    } if (message.length > 500) {
        error.innerHTML = "Сообдение слишком длинное";
        return false;
    }

    return true;
}

function validatePhone(phone) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
}


document.getElementById('order-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validate(this)) {
        document.getElementById('error').style.color = "black";
        document.getElementById('error').innerHTML = "Заказ оформлен!";
    }
});


