class ClienteView {
    constructor(controller) {
        this.controller = controller;
        this.moduleContent = document.getElementById("module-content");
    }

    render(clientes) {
        this.moduleContent.innerHTML = `
            <h2>Gestión de Clientes</h2>
            <button id="btn-agregar-cliente">➕ Agregar Cliente</button>
            <table class="tabla-clientes">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                        <th>País</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${clientes.map(cliente => `
                        <tr>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.email}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.ciudad}</td>
                            <td>${cliente.pais}</td>
                            <td>
                                <button onclick="clienteController.editarCliente(${cliente.id})">✏️ Editar</button>
                                <button onclick="clienteController.eliminarCliente(${cliente.id})">🗑️ Eliminar</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        // Botón de agregar cliente
        document.getElementById("btn-agregar-cliente").addEventListener("click", () => {
            this.mostrarFormulario();
        });
    }

    mostrarFormulario(cliente = null) {
        this.moduleContent.innerHTML = `
            <h2>${cliente ? "Editar Cliente" : "Agregar Cliente"}</h2>
            <form id="form-cliente">
                <label>Nombre:</label>
                <input type="text" id="nombre" value="${cliente ? cliente.nombre : ""}" required>
                <label>Email:</label>
                <input type="email" id="email" value="${cliente ? cliente.email : ""}" required>
                <label>Teléfono:</label>
                <input type="text" id="telefono" value="${cliente ? cliente.telefono : ""}" required>
                <label>Ciudad:</label>
                <input type="text" id="ciudad" value="${cliente ? cliente.ciudad : ""}" required>
                <label>País:</label>
                <input type="text" id="pais" value="${cliente ? cliente.pais : ""}" required>
                <button type="submit">💾 ${cliente ? "Actualizar" : "Guardar"}</button>
                <button type="button" id="cancelar">❌ Cancelar</button>
            </form>
        `;

        document.getElementById("form-cliente").addEventListener("submit", (e) => {
            e.preventDefault();
            const nuevoCliente = new Cliente(
                document.getElementById("nombre").value,
                document.getElementById("email").value,
                document.getElementById("telefono").value,
                document.getElementById("ciudad").value,
                document.getElementById("pais").value
            );

            if (cliente) {
                this.controller.actualizarCliente(cliente.id, nuevoCliente);
            } else {
                this.controller.agregarCliente(nuevoCliente);
            }
        });

        document.getElementById("cancelar").addEventListener("click", () => {
            this.controller.cargarClientes();
        });
    }
}
