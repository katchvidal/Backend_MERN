//  Variables de Entorno
require('dotenv').config()

//  Configuracion de Servidor basado en Clases
const Server = require('./models/server.js')

//  Creando un Servidor
const server = new Server()

//  Llamando al Servidor y Levantarlo
server.listen();