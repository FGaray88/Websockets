const messages = [];

class Messages {

    constructor(archivo) {
        this.list = messages;
    }

    save(message) {
        const { id, username, text, time } = message;
        const newMessage = {
            id,
            username,
            text,
            time
        };
        this.list.push(newMessage);
        console.log("persistencia: ", messages);
        return newMessage;
    }

    getById(number) {
        return this.list.find(product => product.id === +(number))
    }

    updateById(number, product) {
        const productIndex = this.list.findIndex((product) => product.id === +(number));
        if (productIndex < 0) return null;
        const { username, text, time } = message;

        const updatedProduct = {
            id: this.list[productIndex].id,
            username,
            text,
            time
        };
        this.list[productIndex] = updatedProduct;
        return updatedProduct;
    }

    getAll() {
        return this.list;
    }

    deleteById(number) {
        const productIndex = this.list.findIndex((product) => product.id === +(number));
        if (productIndex < 0) return null;
        return this.list.splice(productIndex, 1);
    }
}

module.exports = Messages;
