/**
 * VISTA DE PROVEEDORES
 * 
 * Este archivo se encarga de mostrar la información de los proveedores
 * en la pantalla del usuario. Es como la "cara" de nuestra aplicación.
 * 
 * ¿Qué es una vista?
 * Una vista es la parte que el usuario ve y con la que interactúa.
 * Se encarga de mostrar datos y capturar las acciones del usuario.
 */

class ProveedorView {
    constructor() {
        // Referencia al contenedor donde mostraremos el contenido
        this.container = document.getElementById('module-content');
        
        // Referencia al modal para formularios
        this.modal = null;
        
        // Referencia al formulario
        this.formulario = null;
        
        // ID del proveedor que estamos editando (null si es nuevo)
        this.proveedorEditando = null;
    }

    /**
     * Muestra la vista principal de proveedores
     * 
     * @param {Array} proveedores - Lista de proveedores a mostrar
     */
    mostrarVista(proveedores) {
        // Creamos el HTML para la vista de proveedores
        const html = `
            <div class="proveedores-container">
                <!-- Encabezado con título y botón de agregar -->
                <div class="proveedores-header">
                    <h2>Gestión de Proveedores</h2>
                    <button class="btn-agregar" onclick="window.proveedorController.mostrarFormulario()">
                        ➕ Agregar Proveedor
                    </button>
                </div>

                <!-- Tabla de proveedores -->
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Contacto</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Ciudad</th>
                                <th>Tipo de Producto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-proveedores">
                            ${this.generarFilasTabla(proveedores)}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal para formularios -->
            <div id="modal-proveedor" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="titulo-modal">Agregar Proveedor</h3>
                        <span class="close" onclick="window.proveedorController.cerrarModal()">&times;</span>
                    </div>
                    <form id="formulario-proveedor">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="nombre">Nombre del Proveedor *</label>
                                <input type="text" id="nombre" name="nombre" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="contacto">Persona de Contacto *</label>
                                <input type="text" id="contacto" name="contacto" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="telefono">Teléfono *</label>
                                <input type="tel" id="telefono" name="telefono" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            
                            <div class="form-group full-width">
                                <label for="direccion">Dirección *</label>
                                <input type="text" id="direccion" name="direccion" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="ciudad">Ciudad *</label>
                                <input type="text" id="ciudad" name="ciudad" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="pais">País *</label>
                                <input type="text" id="pais" name="pais" required>
                            </div>
                            
                            <div class="form-group full-width">
                                <label for="tipoProducto">Tipo de Producto *</label>
                                <input type="text" id="tipoProducto" name="tipoProducto" required>
                            </div>
                        </div>
                        
                        <div class="form-buttons">
                            <button type="button" class="btn btn-secondary" onclick="window.proveedorController.cerrarModal()">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Insertamos el HTML en el contenedor
        this.container.innerHTML = html;
        
        // Obtenemos referencias a los elementos del modal
        this.modal = document.getElementById('modal-proveedor');
        this.formulario = document.getElementById('formulario-proveedor');
        
        // Agregamos el evento de envío del formulario
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitamos que la página se recargue
            window.proveedorController.procesarFormulario();
        });
    }

    /**
     * Genera las filas de la tabla con los datos de los proveedores
     * 
     * @param {Array} proveedores - Lista de proveedores
     * @returns {string} - HTML de las filas de la tabla
     */
    generarFilasTabla(proveedores) {
        // Si no hay proveedores, mostramos un mensaje
        if (proveedores.length === 0) {
            return `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
                        No hay proveedores registrados. ¡Agrega el primero!
                    </td>
                </tr>
            `;
        }

        // Generamos una fila por cada proveedor
        return proveedores.map(proveedor => `
            <tr>
                <td>${proveedor.nombre}</td>
                <td>${proveedor.contacto}</td>
                <td>${proveedor.telefono}</td>
                <td>${proveedor.email}</td>
                <td>${proveedor.ciudad}</td>
                <td>${proveedor.tipoProducto}</td>
                <td>
                    <button class="btn-accion btn-editar" onclick="window.proveedorController.editarProveedor('${proveedor.id}')">
                        ✏️ Editar
                    </button>
                    <button class="btn-accion btn-eliminar" onclick="window.proveedorController.eliminarProveedor('${proveedor.id}')">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>
        `).join(''); // Unimos todas las filas en una sola cadena
    }

    /**
     * Actualiza la tabla de proveedores
     * 
     * @param {Array} proveedores - Lista actualizada de proveedores
     */
    actualizarTabla(proveedores) {
        // Buscamos la tabla en el DOM
        const tabla = document.getElementById('tabla-proveedores');
        
        if (tabla) {
            // Actualizamos el contenido de la tabla
            tabla.innerHTML = this.generarFilasTabla(proveedores);
        }
    }

    /**
     * Muestra el modal para agregar o editar un proveedor
     * 
     * @param {Proveedor|null} proveedor - Proveedor a editar (null para nuevo)
     */
    mostrarModal(proveedor = null) {
        // Si hay un proveedor, estamos editando
        if (proveedor) {
            this.proveedorEditando = proveedor;
            document.getElementById('titulo-modal').textContent = 'Editar Proveedor';
            this.llenarFormulario(proveedor);
        } else {
            // Si no hay proveedor, estamos agregando uno nuevo
            this.proveedorEditando = null;
            document.getElementById('titulo-modal').textContent = 'Agregar Proveedor';
            this.limpiarFormulario();
        }

        // Mostramos el modal
        this.modal.style.display = 'block';
        
        // Agregar evento para cerrar al hacer clic fuera del modal
        this.modal.onclick = (event) => {
            if (event.target === this.modal) {
                this.cerrarModal();
            }
        };
        
        // Prevenir que el clic en el contenido del modal lo cierre
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.onclick = (event) => {
            event.stopPropagation();
        };
        
        // Agregar evento para cerrar con la tecla Escape
        document.addEventListener('keydown', this.manejarTeclado.bind(this));
    }

    /**
     * Cierra el modal
     */
    cerrarModal() {
        this.modal.style.display = 'none';
        this.limpiarFormulario();
        this.proveedorEditando = null;
        
        // Remover el evento del teclado
        document.removeEventListener('keydown', this.manejarTeclado.bind(this));
    }
    
    /**
     * Maneja las teclas presionadas
     * 
     * @param {KeyboardEvent} event - Evento del teclado
     */
    manejarTeclado(event) {
        if (event.key === 'Escape') {
            this.cerrarModal();
        }
    }

    /**
     * Llena el formulario con los datos de un proveedor
     * 
     * @param {Proveedor} proveedor - Proveedor cuyos datos queremos mostrar
     */
    llenarFormulario(proveedor) {
        // Llenamos cada campo del formulario con los datos del proveedor
        document.getElementById('nombre').value = proveedor.nombre;
        document.getElementById('contacto').value = proveedor.contacto;
        document.getElementById('telefono').value = proveedor.telefono;
        document.getElementById('email').value = proveedor.email;
        document.getElementById('direccion').value = proveedor.direccion;
        document.getElementById('ciudad').value = proveedor.ciudad;
        document.getElementById('pais').value = proveedor.pais;
        document.getElementById('tipoProducto').value = proveedor.tipoProducto;
    }

    /**
     * Limpia todos los campos del formulario
     */
    limpiarFormulario() {
        // Reseteamos el formulario
        this.formulario.reset();
    }

    /**
     * Obtiene los datos del formulario
     * 
     * @returns {Object} - Objeto con los datos del formulario
     */
    obtenerDatosFormulario() {
        return {
            nombre: document.getElementById('nombre').value.trim(),
            contacto: document.getElementById('contacto').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            email: document.getElementById('email').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            ciudad: document.getElementById('ciudad').value.trim(),
            pais: document.getElementById('pais').value.trim(),
            tipoProducto: document.getElementById('tipoProducto').value.trim()
        };
    }

    /**
     * Muestra un mensaje de éxito
     * 
     * @param {string} mensaje - Mensaje a mostrar
     */
    mostrarMensajeExito(mensaje) {
        // Creamos un elemento para mostrar el mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.className = 'mensaje-exito';
        mensajeElement.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
        `;
        mensajeElement.textContent = mensaje;

        // Insertamos el mensaje al principio del contenedor
        this.container.insertBefore(mensajeElement, this.container.firstChild);

        // Eliminamos el mensaje después de 3 segundos
        setTimeout(() => {
            if (mensajeElement.parentNode) {
                mensajeElement.parentNode.removeChild(mensajeElement);
            }
        }, 3000);
    }

    /**
     * Muestra un mensaje de error
     * 
     * @param {string} mensaje - Mensaje a mostrar
     */
    mostrarMensajeError(mensaje) {
        // Creamos un elemento para mostrar el mensaje de error
        const mensajeElement = document.createElement('div');
        mensajeElement.className = 'mensaje-error';
        mensajeElement.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
        `;
        mensajeElement.textContent = mensaje;

        // Insertamos el mensaje al principio del contenedor
        this.container.insertBefore(mensajeElement, this.container.firstChild);

        // Eliminamos el mensaje después de 5 segundos
        setTimeout(() => {
            if (mensajeElement.parentNode) {
                mensajeElement.parentNode.removeChild(mensajeElement);
            }
        }, 5000);
    }

    /**
     * Muestra un diálogo de confirmación para eliminar
     * 
     * @param {string} nombreProveedor - Nombre del proveedor a eliminar
     * @returns {boolean} - true si el usuario confirma, false si no
     */
    confirmarEliminacion(nombreProveedor) {
        return confirm(`¿Estás seguro de que quieres eliminar al proveedor "${nombreProveedor}"?\n\nEsta acción no se puede deshacer.`);
    }
}
