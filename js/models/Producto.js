class Producto {
    constructor(nombre, categoria, precio, stock) {
        this.id = Date.now(); // ID único
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
}
