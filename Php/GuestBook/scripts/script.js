function getGuestsFromServer() {
    fetch('http://guest-book/data.php')
    .then(response => response.json())
    .then(jsonData => createPosts(jsonData))
    .catch(error => console.error(error))
}

function createPosts(posts) {
    let mainPosts = document.getElementById('mainPosts');

    mainPosts.innerHTML = "";

    posts.forEach(post => {
        let mainPost = document.createElement('div');
        mainPost.className = 'main__posts__post';

        let postTime = document.createElement('p');
        postTime.className = 'post__time';
        postTime.textContent = post.date;
        mainPost.appendChild(postTime);

        let postName = document.createElement('p');
        postName.className = 'post__name';
        postName.textContent = post.name;
        mainPost.appendChild(postName);

        let postMessage = document.createElement('p');
        postMessage.className = 'post__message';
        postMessage.textContent = post.message;
        mainPost.appendChild(postMessage);

        mainPosts.appendChild(mainPost);     
    });
}
 
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    removeMessageError();

    if (validateMessage()) {
        validateName();
        const formData = new FormData(form);
        fetch("http://guest-book/server.php", {
            method: "POST",
            body: formData,
        })
        form.reset();
    }
})

function validateName() {
    let name = document.getElementById('inputName');
    if (name.value.trim() === "") {
        name.value = "Аноним";
    }
}

function removeMessageError() {
    let formBlock = document.getElementById('formBlock');
    console.log(formBlock.childNodes.length);
    if (formBlock.childNodes.length !== 0) {
        for (let i = 0; i < formBlock.childNodes.length; i++) {
            formBlock.removeChild(formBlock.childNodes[i]);
        }
    }
    document.getElementById('message').classList.remove('_error');
}

function validateMessage() {
    let message = document.getElementById('message');
    let i = true;
    if (message.value.trim() === "") {
        let labelError = document.getElementById('formBlock');
        labelError.innerHTML = 'Необходимо ввести сообщение';
        document.getElementById('message').classList.add("_error");
        message.onblur = function() {
            labelError.className = 'block__label-error';
        }
        message.onfocus = function() {
            labelError.className = 'block__label';
        }
        message.focus();
        i = false;
    } 
    return i;
}

getGuestsFromServer();
