class ClienteController {
    constructor() {
        this.clientes = [];
        this.view = new ClienteView(this);
        this.cargarClientes();
    }

    cargarClientes() {
        this.view.render(this.clientes);
    }

    agregarCliente(cliente) {
        this.clientes.push(cliente);
        this.cargarClientes();
    }

    editarCliente(id) {
        const cliente = this.clientes.find(c => c.id === id);
        if (cliente) {
            this.view.mostrarFormulario(cliente);
        }
    }

    actualizarCliente(id, clienteActualizado) {
        this.clientes = this.clientes.map(c => c.id === id ? { ...clienteActualizado, id } : c);
        this.cargarClientes();
    }

    eliminarCliente(id) {
        this.clientes = this.clientes.filter(c => c.id !== id);
        this.cargarClientes();
    }
}

