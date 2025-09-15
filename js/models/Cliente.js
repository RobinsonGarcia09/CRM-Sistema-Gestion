class Cliente {
    constructor(nombre, email, telefono, ciudad, pais) {
        this.id = Date.now(); // id único
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.pais = pais;
    }
}
