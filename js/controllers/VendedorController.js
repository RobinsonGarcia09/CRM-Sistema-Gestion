class VendedorController {
    constructor() {
        this.vendedores = [];
        this.view = new VendedorView(this);
        this.cargarVendedores();
    }

    cargarVendedores() {
        this.view.render(this.vendedores);
    }

    agregarVendedor(vendedor) {
        this.vendedores.push(vendedor);
        this.cargarVendedores();
    }

    editarVendedor(id) {
        const vendedor = this.vendedores.find(v => v.id === id);
        if (vendedor) {
            this.view.mostrarFormulario(vendedor);
        }
    }

    actualizarVendedor(id, vendedorActualizado) {
        this.vendedores = this.vendedores.map(v => v.id === id ? { ...vendedorActualizado, id } : v);
        this.cargarVendedores();
    }

    eliminarVendedor(id) {
        this.vendedores = this.vendedores.filter(v => v.id !== id);
        this.cargarVendedores();
    }
}
