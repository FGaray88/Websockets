

const socket = io();

const formProducts = document.getElementById("form-products");

const inputTitle = document.getElementById("form-title");
const inputPrice = document.getElementById("form-price");
const inputDescripcion = document.getElementById("form-descripcion");
const inputThumbnail = document.getElementById("form-thumbnail");








const renderProducts = (data) => {
    fetch("http://localhost:8080/products.hbs")
    .then((result) => JSON.stringify(result))
    .then((serverTemplate) => {
        const template = Handlebars.compile(serverTemplate);
        const html = template({ data });
        document.getElementById('divCentral').innerHTML = html;
        console.log(serverTemplate)
    })
}

//fetch("http://localhost:8080/")

socket.on("products", (data) => {
    renderProducts(data)
});

formProducts.addEventListener("submit", (e) => {
    event.preventDefault();
    const newProduct = {
        nombre: inputTitle,
        precio: +(inputPrice),
        picture: inputThumbnail,
        descr: inputThumbnail
    };

    socket.emit("new-product", newProduct);
/*     textInput.value = ""; */
});







