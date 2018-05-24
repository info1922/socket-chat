const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');

const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // Configurar el listener
    client.on('entrarChat', (usuario, callback) => {

        // console.log(usuario);

        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesaria'
            });
        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        // Emitimos un evento llamado listaPersona llama a todas las personas conectadas
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));

        // Retorna las personas conecatadas al chat
        callback(usuarios.getPersonasPorSala(usuario.sala));


    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        // Emitimos el mensaje
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    // Desconexión
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        // Avisar a los clientes que alguien salio del chat
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        // Emitimos un evento llamado listaPersona llama a todas las personas conectadas
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });


});