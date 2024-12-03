module.exports = (req, res, next) => {
    // Verificamos si hay un usuario en req.usuario
    if (req.usuario) {
        // Si el usuario existe, asignamos sus datos a res.locals
        res.locals.usuario = req.usuario;
        res.locals.role = req.usuario.rol; // Guardamos el rol en res.locals

        // Log para saber qué rol está siendo asignado
        if (res.locals.role === 'admin') {
            console.log(`Usuario con rol "admin" autorizado: ${req.usuario.usuario}`);
        } else if (res.locals.role === 'super-admin') {
            console.log(`Usuario con rol "super-admin" autorizado: ${req.usuario.usuario}`);
        } else {
            console.log(`Usuario con rol "${res.locals.role}" autorizado: ${req.usuario.usuario}`);
        }
    } else {
        // Si no hay usuario, asignamos valores predeterminados
        res.locals.usuario = {
            usuario: 'Invitado', // Nombre predeterminado
            imagen: '01.png', // Imagen predeterminada
            rol: 'guest' // Rol predeterminado
        };
        res.locals.role = 'guest'; // Role predeterminado


    }

    return next(); // Pasamos al siguiente middleware o controlador
};