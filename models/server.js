const express = require('express')
const cors = require('cors');
const { connect } = require('../database/config');

class server {

    constructor (){

        this.app = express();
        this.PORT = process.env.PORT;
        this.middleware();
        this.database();
        //  Path de Rutas -> Aqui van todas las Rutas Path 
        this.auth = '/api/auth'
        this.evento = '/api/evento'
        this.routes();
        
    }

    middleware(){

        //  Lectura y Parseo del Body
        this.app.use(express.json())

        //  CORS
        this.app.use(cors())

        //  Directorio Publico
        this.app.use(express.static('public'))

    }

    routes(){

        //  Aqui Definimos todas las Rutas contruidas con su Path
        this.app.use(this.auth, require('../routes/auth'))
        this.app.use(this.evento, require('../routes/events'))
    }

    async database(){
        await connect();
    }

    listen(){

        this.app.listen(this.PORT, () =>{
            console.log(`Servidor en el puerto:`, this.PORT )
        })

    }


}


module.exports = server;