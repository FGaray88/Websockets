const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const { formatMessage } = require("./utils/utils")

const Products = require("./model/products");
const products = new Products();
const Messages = require("./model/contMessages");
const messages = new Messages("./model/messages.js");

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const users = [];


// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))


httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});


io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
    const productos = products.getAll()
    socket.emit("products", [...productos]);
    const mensajes = messages.getAll()
    socket.emit("messages", mensajes);
    socket.on("new-product", (data) => {
        const addProduct =  products.save(data)
        io.emit("products", [...productos]);
    });
    socket.on("new-message", (data) => {
        const newUser = {
            id: socket.id,
            username: data.user
        }
        users.push(newUser)
        const author = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, author.username, data.text);
        const addMessage = messages.save(newMessage)
        io.emit("chat-message", newMessage);
    });
});




