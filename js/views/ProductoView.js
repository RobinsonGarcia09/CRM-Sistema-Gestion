class ProductoView {
    constructor(controller) {
        this.controller = controller;
        this.moduleContent = document.getElementById("module-content");
    }

    render(productos) {
        this.moduleContent.innerHTML = `
            <h2>Gestión de Productos</h2>
            <button id="btn-agregar-producto"  class = "btn-agregar"> ➕ Agregar Producto</button>
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${productos.map(producto => `
                        <tr>
                            <td>${producto.nombre}</td>
                            <td>${producto.categoria}</td>
                            <td>$${producto.precio.toFixed(2)}</td>
                            <td>${producto.stock}</td>
                            <td>
                                <button onclick="productoController.editarProducto(${producto.id})">✏️ Editar</button>
                                <button onclick="productoController.eliminarProducto(${producto.id})">🗑️ Eliminar</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        // Botón de agregar
        document.getElementById("btn-agregar-producto").addEventListener("click", () => {
            this.mostrarFormulario();
        });
    }

    mostrarFormulario(producto = null) {
        this.moduleContent.innerHTML = `
            <h2>${producto ? "Editar Producto" : "Agregar Producto"}</h2>
            <form id="form-producto">
                <label>Nombre:</label>
                <input type="text" id="nombre" value="${producto ? producto.nombre : ""}" required>
                <label>Categoría:</label>
                <input type="text" id="categoria" value="${producto ? producto.categoria : ""}" required>
                <label>Precio:</label>
                <input type="number" id="precio" value="${producto ? producto.precio : ""}" step="0.01" required>
                <label>Stock:</label>
                <input type="number" id="stock" value="${producto ? producto.stock : ""}" required>
                <button type="submit">💾 ${producto ? "Actualizar" : "Guardar"}</button>
                <button type="button" id="cancelar">❌ Cancelar</button>
            </form>
        `;

        document.getElementById("form-producto").addEventListener("submit", (e) => {
            e.preventDefault();
            const nuevoProducto = new Producto(
                document.getElementById("nombre").value,
                document.getElementById("categoria").value,
                parseFloat(document.getElementById("precio").value),
                parseInt(document.getElementById("stock").value)
            );

            if (producto) {
                this.controller.actualizarProducto(producto.id, nuevoProducto);
            } else {
                this.controller.agregarProducto(nuevoProducto);
            }
        });

        document.getElementById("cancelar").addEventListener("click", () => {
            this.controller.cargarProductos();
        });
    }
}
