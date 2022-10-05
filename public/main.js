

const socket = io();

const formProducts = document.getElementById("form-products");

const inputTitle = document.getElementById("form-title");
const inputPrice = document.getElementById("form-price");
const inputDescripcion = document.getElementById("form-descripcion");
const inputThumbnail = document.getElementById("form-thumbnail");


// chat


const renderMessage = (socketId, data) => {
    const div = document.createElement('div');
    let className;
    let html;
    if (data.id) {
        className = socketId === data.id
            ? 'my-messages-container'
            : 'other-messages-container';
        if (className === 'my-messages-container') {
            html = `<div class="my-messages">
            <span><b>Yo</b> ${data.time}</span><br />
            <span>${data.text}</span>
        </div>`;
        }
        else {
            html = `<div class="other-messages">
            <span><b>${data.username}</b> ${data.time}</span><br />
            <span>${data.text}</span>
        </div>`
        }
    }
    else {
        className = 'bot-messages';
        html = `<b>FG-Bot dice: </b><i>${data.text}</i>`;
    }
    div.classList.add(className);
    div.innerHTML = html;
    document.getElementById('messages').appendChild(div);
};


const renderMessages = (data) => {
    const html = data.map((elem) => {
        let fragment = `
        <div class="other-messages-container">
            <div class="other-messages">
                <span><b>${elem.username}</b> ${elem.time}</span><br />
                <span>${elem.text}</span>
            </div>
        </div>`;
        return fragment;
    }).join('\n');
    document.getElementById('messages').innerHTML = html;};

const chatForm = document.getElementById("chat-form");
const textInput = document.getElementById("text-input");



const { username } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});



socket.emit("join-chat", { username });


chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const msg = textInput.value;
    socket.emit("new-message", msg);
    textInput.value = "";
});

socket.on("chat-message", (data) => {
    renderMessage(socket.id, data);
});

socket.on("messages", (data) => {
    renderMessages(data);
});


/* socket.on("messages", (data) => {
    const html = data.map((message) => {
        return `
            <span>
                <strong>${message.author}:</strong>${message.text}
            </span><br>
        `;

    }).join("\n")
    document.getElementById('divChat').innerHTML = html;
}); */


// hasta aqui chat









// products


const renderProducts = (products) => {
    fetch("http://localhost:8080/products.hbs")
    .then((result) => result.text())
    .then((serverTemplate) => {
        const template = Handlebars.compile(serverTemplate);
        const html = template({ products });
        document.getElementById('divCentral').innerHTML = html;
    })
}



socket.on("products", (data) => {
    renderProducts(data)
});



formProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const newProduct = {
        nombre: inputTitle.value,
        precio: +(inputPrice.value),
        picture: inputThumbnail.value,
        descr: inputDescripcion.value
    };
    socket.emit("new-product", newProduct);
    
/*     textInput.value = ""; */
});







