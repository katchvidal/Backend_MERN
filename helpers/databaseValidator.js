const Usuario = require('../models/usuario')
const Evento = require('../models/evento')

//  Validacion de que Ya existe ese Email
const AlreadyEmail =  async(email = '') =>{
    
    const exists = await Usuario.findOne({email})
    if (exists){
        throw new Error(`The Email: ${email} is already registered`)
    }

}

const EventoExists = async(id) => {

    //  Buscalo por id
    const ExistsEvento = await Evento.findById(id)

    //  Si no Existe Lanza un error
    if (!ExistsEvento){
        throw new Error(`El id: ${ id } No Existe `)
    }

}


module.exports = {

    AlreadyEmail,
    EventoExists
    
    
}