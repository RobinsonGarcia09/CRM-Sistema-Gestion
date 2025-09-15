class Vendedor {
    constructor(nombre, email, telefono, region) {
        this.id = Date.now(); // ID único
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.region = region;
    }
}
