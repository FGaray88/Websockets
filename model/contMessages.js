const fs = require("fs")

class Messages {

    constructor(archivo) {
        this.archivo = archivo;
    }

    save(message) {
            const { id, username, text, time } = message;
            /* const newMessage = {
                id,
                username,
                text,
                time
            }; */
            const data = leerArchivo(this.archivo);
            data.push(message)
            escribirArchivo(this.archivo, data)
            console.log("persistencia: ", data);
    }

    getAll() {
        const data = leerArchivo(this.archivo);
        return data;
    }
}

leerArchivo = (archivo) => {
        const data = fs.readFileSync(archivo,"utf-8")
        console.log("mensaje repetido ", data);
        return data;
}

escribirArchivo = (archivo, data) => {
        fs.writeFileSync(archivo, data)
        console.log("archivo actualizado con exito")
}

module.exports = Messages;
