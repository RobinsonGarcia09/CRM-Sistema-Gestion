/**
 * CONTROLADOR DE PROVEEDORES
 * 
 * Este archivo coordina las acciones entre el modelo (datos) y la vista (pantalla).
 * Es como el "cerebro" que decide qué hacer cuando el usuario hace clic en algo.
 * 
 * ¿Qué es un controlador?
 * Un controlador recibe las acciones del usuario, decide qué hacer con ellas,
 * actualiza los datos si es necesario, y le dice a la vista qué mostrar.
 */

class ProveedorController {
    constructor() {
        // Creamos una instancia del servicio de proveedores (modelo)
        this.proveedorService = new ProveedorService();
        
        // Creamos una instancia de la vista de proveedores
        this.proveedorView = new ProveedorView();
        
        // Cargamos y mostramos los proveedores al inicializar
        this.cargarProveedores();
    }

    /**
     * Carga todos los proveedores y los muestra en la vista
     */
    cargarProveedores() {
        try {
            // Obtenemos todos los proveedores del servicio
            const proveedores = this.proveedorService.obtenerTodos();
            
            // Le decimos a la vista que muestre los proveedores
            this.proveedorView.mostrarVista(proveedores);
            
            console.log('Proveedores cargados correctamente:', proveedores.length);
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
            this.proveedorView.mostrarMensajeError('Error al cargar los proveedores');
        }
    }

    /**
     * Muestra el formulario para agregar o editar un proveedor
     * 
     * @param {string|null} idProveedor - ID del proveedor a editar (null para nuevo)
     */
    mostrarFormulario(idProveedor = null) {
        try {
            let proveedor = null;
            
            // Si hay un ID, buscamos el proveedor para editarlo
            if (idProveedor) {
                proveedor = this.proveedorService.obtenerPorId(idProveedor);
                
                if (!proveedor) {
                    this.proveedorView.mostrarMensajeError('Proveedor no encontrado');
                    return;
                }
            }
            
            // Le decimos a la vista que muestre el modal con el formulario
            this.proveedorView.mostrarModal(proveedor);
            
        } catch (error) {
            console.error('Error al mostrar formulario:', error);
            this.proveedorView.mostrarMensajeError('Error al abrir el formulario');
        }
    }

    /**
     * Procesa el envío del formulario (agregar o editar)
     */
    procesarFormulario() {
        try {
            // Obtenemos los datos del formulario
            const datosFormulario = this.proveedorView.obtenerDatosFormulario();
            
            // Validamos que todos los campos estén completos
            if (!this.validarDatosFormulario(datosFormulario)) {
                this.proveedorView.mostrarMensajeError('Por favor, completa todos los campos obligatorios');
                return;
            }

            // Si estamos editando un proveedor existente
            if (this.proveedorView.proveedorEditando) {
                this.actualizarProveedor(datosFormulario);
            } else {
                // Si estamos agregando un nuevo proveedor
                this.agregarProveedor(datosFormulario);
            }
            
        } catch (error) {
            console.error('Error al procesar formulario:', error);
            this.proveedorView.mostrarMensajeError('Error al procesar el formulario');
        }
    }

    /**
     * Valida que todos los campos del formulario estén completos
     * 
     * @param {Object} datos - Datos del formulario
     * @returns {boolean} - true si son válidos, false si no
     */
    validarDatosFormulario(datos) {
        // Verificamos que todos los campos obligatorios tengan contenido
        const camposObligatorios = ['nombre', 'contacto', 'telefono', 'email', 'direccion', 'ciudad', 'pais', 'tipoProducto'];
        
        for (let campo of camposObligatorios) {
            if (!datos[campo] || datos[campo].trim() === '') {
                return false;
            }
        }
        
        // Validamos el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.email)) {
            this.proveedorView.mostrarMensajeError('Por favor, ingresa un email válido');
            return false;
        }
        
        return true;
    }

    /**
     * Agrega un nuevo proveedor
     * 
     * @param {Object} datos - Datos del nuevo proveedor
     */
    agregarProveedor(datos) {
        try {
            // Creamos una nueva instancia de Proveedor con los datos del formulario
            const nuevoProveedor = new Proveedor(
                datos.nombre,
                datos.contacto,
                datos.telefono,
                datos.email,
                datos.direccion,
                datos.ciudad,
                datos.pais,
                datos.tipoProducto
            );
            
            // Intentamos agregar el proveedor usando el servicio
            const exito = this.proveedorService.agregar(nuevoProveedor);
            
            if (exito) {
                // Si se agregó correctamente, cerramos el modal y actualizamos la vista
                this.proveedorView.cerrarModal();
                this.cargarProveedores();
                this.proveedorView.mostrarMensajeExito('Proveedor agregado correctamente');
            } else {
                // Si hubo un error, mostramos un mensaje
                this.proveedorView.mostrarMensajeError('Error al agregar el proveedor. Verifica que el email no esté duplicado.');
            }
            
        } catch (error) {
            console.error('Error al agregar proveedor:', error);
            this.proveedorView.mostrarMensajeError('Error al agregar el proveedor');
        }
    }

    /**
     * Actualiza un proveedor existente
     * 
     * @param {Object} datos - Nuevos datos del proveedor
     */
    actualizarProveedor(datos) {
        try {
            // Obtenemos el ID del proveedor que estamos editando
            const idProveedor = this.proveedorView.proveedorEditando.id;
            
            // Intentamos actualizar el proveedor usando el servicio
            const exito = this.proveedorService.actualizar(idProveedor, datos);
            
            if (exito) {
                // Si se actualizó correctamente, cerramos el modal y actualizamos la vista
                this.proveedorView.cerrarModal();
                this.cargarProveedores();
                this.proveedorView.mostrarMensajeExito('Proveedor actualizado correctamente');
            } else {
                // Si hubo un error, mostramos un mensaje
                this.proveedorView.mostrarMensajeError('Error al actualizar el proveedor');
            }
            
        } catch (error) {
            console.error('Error al actualizar proveedor:', error);
            this.proveedorView.mostrarMensajeError('Error al actualizar el proveedor');
        }
    }

    /**
     * Edita un proveedor existente
     * 
     * @param {string} idProveedor - ID del proveedor a editar
     */
    editarProveedor(idProveedor) {
        try {
            // Buscamos el proveedor por su ID
            const proveedor = this.proveedorService.obtenerPorId(idProveedor);
            
            if (!proveedor) {
                this.proveedorView.mostrarMensajeError('Proveedor no encontrado');
                return;
            }
            
            // Mostramos el formulario con los datos del proveedor
            this.mostrarFormulario(idProveedor);
            
        } catch (error) {
            console.error('Error al editar proveedor:', error);
            this.proveedorView.mostrarMensajeError('Error al abrir el formulario de edición');
        }
    }

    /**
     * Elimina un proveedor
     * 
     * @param {string} idProveedor - ID del proveedor a eliminar
     */
    eliminarProveedor(idProveedor) {
        try {
            // Buscamos el proveedor por su ID
            const proveedor = this.proveedorService.obtenerPorId(idProveedor);
            
            if (!proveedor) {
                this.proveedorView.mostrarMensajeError('Proveedor no encontrado');
                return;
            }
            
            // Pedimos confirmación al usuario
            const confirmacion = this.proveedorView.confirmarEliminacion(proveedor.nombre);
            
            if (confirmacion) {
                // Si el usuario confirma, eliminamos el proveedor
                const exito = this.proveedorService.eliminar(idProveedor);
                
                if (exito) {
                    // Si se eliminó correctamente, actualizamos la vista
                    this.cargarProveedores();
                    this.proveedorView.mostrarMensajeExito('Proveedor eliminado correctamente');
                } else {
                    // Si hubo un error, mostramos un mensaje
                    this.proveedorView.mostrarMensajeError('Error al eliminar el proveedor');
                }
            }
            
        } catch (error) {
            console.error('Error al eliminar proveedor:', error);
            this.proveedorView.mostrarMensajeError('Error al eliminar el proveedor');
        }
    }

    /**
     * Cierra el modal del formulario
     */
    cerrarModal() {
        this.proveedorView.cerrarModal();
    }

    /**
     * Busca proveedores por un término
     * 
     * @param {string} termino - Término de búsqueda
     */
    buscarProveedores(termino) {
        try {
            // Si no hay término de búsqueda, mostramos todos los proveedores
            if (!termino || termino.trim() === '') {
                this.cargarProveedores();
                return;
            }
            
            // Buscamos proveedores que coincidan con el término
            const proveedoresEncontrados = this.proveedorService.buscar(termino);
            
            // Actualizamos la tabla con los resultados
            this.proveedorView.actualizarTabla(proveedoresEncontrados);
            
            // Mostramos un mensaje con la cantidad de resultados
            if (proveedoresEncontrados.length === 0) {
                this.proveedorView.mostrarMensajeError('No se encontraron proveedores con ese criterio');
            } else {
                this.proveedorView.mostrarMensajeExito(`Se encontraron ${proveedoresEncontrados.length} proveedor(es)`);
            }
            
        } catch (error) {
            console.error('Error al buscar proveedores:', error);
            this.proveedorView.mostrarMensajeError('Error al buscar proveedores');
        }
    }
}
