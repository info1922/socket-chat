class Usuarios {


    constructor() {
        this.personas = [];
    }

    // Permite agregar una persona al chat
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };

        //Agregamos la persona al arreglo de personas
        this.personas.push(persona);

        return this.personas;
    }

    //Obtener una persona por su id
    getPersona(id) {

        // Buscamos a la persona en el arreglo de personas
        // y retornamos el primer elemento
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

        // Si encuentra a la persona nos retorna un objeto si no retorna null

    }

    // Obtener todas las personas
    getPersonas() {
        return this.personas;
    }

    // Retorna todas las personas en una sala en especifica
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });

        return personasEnSala;
    }

    // Eliminar una persona del arreglo de personas (abandona el chat)
    borrarPersona(id) {

        // Obtenemos la persona a borrar ANTES de ser borrada
        let personaBorrada = this.getPersona(id);

        // Solo personas activas en el chat
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }


}

module.exports = {
    Usuarios
};