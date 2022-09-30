const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
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






httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});



// on (escuchar eventos) emit (emitir eventos)
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
    const productos = products.getAll()
    socket.emit("products", [...productos]);

    

    socket.on("new-product", (data) => {
        const addProduct =  products.save(data)
        const allProducts = products.getAll()

        io.emit("all-products", allProducts);
        // este emit al ser IO no necesita ser escuchado del lado del cliente, cierto?
    });




    
});




