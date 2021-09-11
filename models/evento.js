const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const EventoSchema = Schema({

    title : {

        type : String,
        required : true


    },

    start : {

        type : Date,
        required : true

    },

    end : {

        type : Date,
        required : true

    },

    notes : {

        type : String,

    },

    estado : {

        type: String,
        required : [true, 'Estado is required'],
        default : true

    },

    usuario : {

        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'User is required']
    },



})

//  No devolver nunca los siguientes objetos de la base de datos
EventoSchema.methods.toJSON = function(){
    const { __v, _id,  estado,  ... data } = this.toObject()

    //  Modificar el nombre de un objeto por otro sin modificar la base de datos -> _id modificar por USER ID (uid)
    data.eid = _id;

    return data
}


module.exports = model('Evento', EventoSchema);