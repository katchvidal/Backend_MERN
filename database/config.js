const mongoose = require('mongoose');

const connect = async() =>{


    try {

        await mongoose.connect(process.env.MONGODBCNN, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion a la Base de Datos Correctamente ')

    } catch (error) {

        console.log(error)
        throw new Error('No se logro Conectar a la Base de Datos ')

    }


}



module.exports = {
    connect
}