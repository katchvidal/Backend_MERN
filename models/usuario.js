
const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const UserSchema = Schema({

    name : {
        type : String,
        required : [true, 'Name is required'],

    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,

    },

    password : {
        type : String,
        required : [true, 'Password is required'],
    },

    img : {
        type : String

    },

    rol : {
        type : String,
        required : true,
        default : 'User_Rol',
        emun : ['Admin_Rol', 'User_Rol']
    },

    estado : {
        type : Boolean,
        default : true
    },

    google : {
        type : Boolean,
        default : false
    }

})


//  No devolver nunca los siguientes objetos de la base de datos
UserSchema.methods.toJSON = function(){
    const {__v, password, _id,  ... usuario} = this.toObject()

    //  Modificar el nombre de un objeto por otro sin modificar la base de datos -> _id modificar por USER ID (uid)
    usuario.uid = _id
    
    return usuario
}

module.exports = model('Usuario', UserSchema);