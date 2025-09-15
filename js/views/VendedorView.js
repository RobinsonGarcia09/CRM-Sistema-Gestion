class VendedorView {
    constructor(controller) {
        this.controller = controller;
        this.moduleContent = document.getElementById("module-content");
    }

    render(vendedores) {
        this.moduleContent.innerHTML = `
            <h2>Gestión de Vendedores</h2>
            <button id="btn-agregar-vendedor">➕ Agregar Vendedor</button>
            <table class="tabla-vendedores">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Región</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${vendedores.map(v => `
                        <tr>
                            <td>${v.nombre}</td>
                            <td>${v.email}</td>
                            <td>${v.telefono}</td>
                            <td>${v.region}</td>
                            <td>
                                <button onclick="vendedorController.editarVendedor(${v.id})">✏️ Editar</button>
                                <button onclick="vendedorController.eliminarVendedor(${v.id})">🗑️ Eliminar</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        document.getElementById("btn-agregar-vendedor").addEventListener("click", () => {
            this.mostrarFormulario();
        });
    }

    mostrarFormulario(vendedor = null) {
        this.moduleContent.innerHTML = `
            <h2>${vendedor ? "Editar Vendedor" : "Agregar Vendedor"}</h2>
            <form id="form-vendedor">
                <label>Nombre:</label>
                <input type="text" id="nombre" value="${vendedor ? vendedor.nombre : ""}" required>
                <label>Email:</label>
                <input type="email" id="email" value="${vendedor ? vendedor.email : ""}" required>
                <label>Teléfono:</label>
                <input type="text" id="telefono" value="${vendedor ? vendedor.telefono : ""}" required>
                <label>Región:</label>
                <input type="text" id="region" value="${vendedor ? vendedor.region : ""}" required>
                <button type="submit">💾 ${vendedor ? "Actualizar" : "Guardar"}</button>
                <button type="button" id="cancelar">❌ Cancelar</button>
            </form>
        `;

        document.getElementById("form-vendedor").addEventListener("submit", (e) => {
            e.preventDefault();
            const nuevoVendedor = new Vendedor(
                document.getElementById("nombre").value,
                document.getElementById("email").value,
                document.getElementById("telefono").value,
                document.getElementById("region").value
            );

            if (vendedor) {
                this.controller.actualizarVendedor(vendedor.id, nuevoVendedor);
            } else {
                this.controller.agregarVendedor(nuevoVendedor);
            }
        });

        document.getElementById("cancelar").addEventListener("click", () => {
            this.controller.cargarVendedores();
        });
    }
}
