const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const { formatMessage } = require("./utils/utils")
const path = require("path");
const apiRoutes = require("./routers/app.routers");

const Products = require("./model/products");
const products = new Products();


const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);



const messages = [];
const users = [];


// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/", apiRoutes);



//Routes


app.post("/login", (req, res) => {
    const { username } = req.body;
    if (users.find(user => user.username === username)) {
        return res.send("Usuario existente");
    }
    res.redirect(`/main?username=${username}`)
    
});

app.get("/main", (req, res) => {
    console.log(users);
    res.sendFile(__dirname + "/public/main.html")
});





httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});


const botName = "FG-Bot"


// on (escuchar eventos) emit (emitir eventos)
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
    const productos = products.getAll()
    socket.emit("products", [...productos]);

    socket.emit("messages", [...messages]);

    socket.on("join-chat", (data) => {
        const newUser = {
            id: socket.id,
            username: data.username
        };
        users.push(newUser);
        socket.emit("chat-message", formatMessage(null, botName, `Bienvenido`));
    })

    socket.on("new-product", (data) => {
        const addProduct =  products.save(data)
        io.emit("products", [...productos]);
        // este emit al ser IO no necesita ser escuchado del lado del cliente, cierto?
    });




    
});




