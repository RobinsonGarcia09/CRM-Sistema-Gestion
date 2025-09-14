/**
 * MODELO DE PROVEEDOR
 * 
 * Este archivo define la estructura de datos y las operaciones básicas
 * para manejar los proveedores en nuestro CRM.
 * 
 * ¿Qué es un modelo?
 * Un modelo es como una "plantilla" que define cómo deben ser los datos
 * y qué operaciones podemos hacer con ellos (crear, leer, actualizar, eliminar).
 */

class Proveedor {
    /**
     * Constructor de la clase Proveedor
     * 
     * @param {string} nombre - Nombre del proveedor
     * @param {string} contacto - Persona de contacto
     * @param {string} telefono - Número de teléfono
     * @param {string} email - Correo electrónico
     * @param {string} direccion - Dirección del proveedor
     * @param {string} ciudad - Ciudad donde se encuentra
     * @param {string} pais - País del proveedor
     * @param {string} tipoProducto - Tipo de productos que vende
     */
    constructor(nombre, contacto, telefono, email, direccion, ciudad, pais, tipoProducto) {
        // Generamos un ID único para cada proveedor
        this.id = this.generarId();
        
        // Asignamos los datos que recibimos
        this.nombre = nombre;
        this.contacto = contacto;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.tipoProducto = tipoProducto;
        
        // Fecha de creación del registro
        this.fechaCreacion = new Date().toISOString();
    }

    /**
     * Genera un ID único para cada proveedor
     * 
     * @returns {string} - ID único generado
     */
    generarId() {
        // Creamos un ID usando la fecha actual y un número aleatorio
        return 'prov_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Valida que todos los campos obligatorios estén completos
     * 
     * @returns {boolean} - true si es válido, false si no
     */
    validar() {
        // Verificamos que los campos obligatorios no estén vacíos
        return this.nombre && 
               this.contacto && 
               this.telefono && 
               this.email && 
               this.direccion && 
               this.ciudad && 
               this.pais && 
               this.tipoProducto;
    }

    /**
     * Convierte el objeto proveedor a un formato JSON
     * 
     * @returns {Object} - Objeto con los datos del proveedor
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            contacto: this.contacto,
            telefono: this.telefono,
            email: this.email,
            direccion: this.direccion,
            ciudad: this.ciudad,
            pais: this.pais,
            tipoProducto: this.tipoProducto,
            fechaCreacion: this.fechaCreacion
        };
    }

    /**
     * Crea un objeto Proveedor desde datos JSON
     * 
     * @param {Object} data - Datos en formato JSON
     * @returns {Proveedor} - Nueva instancia de Proveedor
     */
    static fromJSON(data) {
        const proveedor = new Proveedor(
            data.nombre,
            data.contacto,
            data.telefono,
            data.email,
            data.direccion,
            data.ciudad,
            data.pais,
            data.tipoProducto
        );
        
        // Asignamos el ID original y la fecha de creación
        proveedor.id = data.id;
        proveedor.fechaCreacion = data.fechaCreacion;
        
        return proveedor;
    }
}

/**
 * CLASE PARA GESTIONAR LA COLECCIÓN DE PROVEEDORES
 * 
 * Esta clase maneja todas las operaciones de la base de datos
 * (aunque en este caso usamos el almacenamiento local del navegador)
 */
class ProveedorService {
    constructor() {
        // Clave para guardar en el almacenamiento local del navegador
        this.storageKey = 'crm_proveedores';
        
        // Cargamos los proveedores existentes al inicializar
        this.proveedores = this.cargarProveedores();
    }

    /**
     * Carga los proveedores desde el almacenamiento local
     * 
     * @returns {Array} - Lista de proveedores
     */
    cargarProveedores() {
        try {
            // Obtenemos los datos del almacenamiento local
            const datos = localStorage.getItem(this.storageKey);
            
            if (datos) {
                // Convertimos el JSON a objetos JavaScript
                const proveedoresJSON = JSON.parse(datos);
                
                // Convertimos cada objeto JSON a una instancia de Proveedor
                return proveedoresJSON.map(proveedorData => 
                    Proveedor.fromJSON(proveedorData)
                );
            }
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
        }
        
        // Si no hay datos o hay error, devolvemos un array vacío
        return [];
    }

    /**
     * Guarda los proveedores en el almacenamiento local
     */
    guardarProveedores() {
        try {
            // Convertimos los proveedores a formato JSON
            const proveedoresJSON = this.proveedores.map(proveedor => proveedor.toJSON());
            
            // Guardamos en el almacenamiento local
            localStorage.setItem(this.storageKey, JSON.stringify(proveedoresJSON));
        } catch (error) {
            console.error('Error al guardar proveedores:', error);
        }
    }

    /**
     * Obtiene todos los proveedores
     * 
     * @returns {Array} - Lista de todos los proveedores
     */
    obtenerTodos() {
        return this.proveedores;
    }

    /**
     * Busca un proveedor por su ID
     * 
     * @param {string} id - ID del proveedor a buscar
     * @returns {Proveedor|null} - Proveedor encontrado o null si no existe
     */
    obtenerPorId(id) {
        return this.proveedores.find(proveedor => proveedor.id === id) || null;
    }

    /**
     * Agrega un nuevo proveedor
     * 
     * @param {Proveedor} proveedor - Proveedor a agregar
     * @returns {boolean} - true si se agregó correctamente, false si no
     */
    agregar(proveedor) {
        // Validamos que el proveedor sea válido
        if (!proveedor.validar()) {
            console.error('El proveedor no es válido');
            return false;
        }

        // Verificamos que no exista un proveedor con el mismo email
        const existe = this.proveedores.find(p => p.email === proveedor.email);
        if (existe) {
            console.error('Ya existe un proveedor con este email');
            return false;
        }

        // Agregamos el proveedor a la lista
        this.proveedores.push(proveedor);
        
        // Guardamos los cambios
        this.guardarProveedores();
        
        return true;
    }

    /**
     * Actualiza un proveedor existente
     * 
     * @param {string} id - ID del proveedor a actualizar
     * @param {Object} datosActualizados - Nuevos datos del proveedor
     * @returns {boolean} - true si se actualizó correctamente, false si no
     */
    actualizar(id, datosActualizados) {
        // Buscamos el proveedor por ID
        const indice = this.proveedores.findIndex(proveedor => proveedor.id === id);
        
        if (indice === -1) {
            console.error('Proveedor no encontrado');
            return false;
        }

        // Actualizamos los datos del proveedor
        Object.assign(this.proveedores[indice], datosActualizados);
        
        // Validamos que el proveedor actualizado sea válido
        if (!this.proveedores[indice].validar()) {
            console.error('Los datos actualizados no son válidos');
            return false;
        }

        // Guardamos los cambios
        this.guardarProveedores();
        
        return true;
    }

    /**
     * Elimina un proveedor
     * 
     * @param {string} id - ID del proveedor a eliminar
     * @returns {boolean} - true si se eliminó correctamente, false si no
     */
    eliminar(id) {
        // Buscamos el índice del proveedor por ID
        const indice = this.proveedores.findIndex(proveedor => proveedor.id === id);
        
        if (indice === -1) {
            console.error('Proveedor no encontrado');
            return false;
        }

        // Eliminamos el proveedor de la lista
        this.proveedores.splice(indice, 1);
        
        // Guardamos los cambios
        this.guardarProveedores();
        
        return true;
    }

    /**
     * Busca proveedores por nombre o email
     * 
     * @param {string} termino - Término de búsqueda
     * @returns {Array} - Lista de proveedores que coinciden
     */
    buscar(termino) {
        const terminoLower = termino.toLowerCase();
        
        return this.proveedores.filter(proveedor => 
            proveedor.nombre.toLowerCase().includes(terminoLower) ||
            proveedor.email.toLowerCase().includes(terminoLower) ||
            proveedor.contacto.toLowerCase().includes(terminoLower)
        );
    }
}
