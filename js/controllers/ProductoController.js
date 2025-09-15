class ProductoController {
    constructor() {
        this.productos = [];
        this.view = new ProductoView(this);
        this.cargarProductos();
    }

    cargarProductos() {
        this.view.render(this.productos);
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.cargarProductos();
    }

    editarProducto(id) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            this.view.mostrarFormulario(producto);
        }
    }

    actualizarProducto(id, productoActualizado) {
        this.productos = this.productos.map(p => p.id === id ? { ...productoActualizado, id } : p);
        this.cargarProductos();
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.id !== id);
        this.cargarProductos();
    }
}
