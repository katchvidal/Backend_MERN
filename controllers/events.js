const {response} = require('express');
const Evento = require('../models/evento')



const obtenerEvento = async(req, res = response ) => {
    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query
    const query = ({estado : true});

    //  Devuelve un query
    const [Total, Eventos] = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
            .populate('usuario', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        mensage : 'Get Evento',
        Total,
        Eventos

    })
}


const crearEvento = async( req, res = response ) =>{

    const { title, start, end, notes } = req.body
    
    //  Generar la data a guardar
    const data = {
        title : req.body.title.toUpperCase() ,
        start,
        end,
        notes : req.body.notes.toUpperCase() ,
        //  El modelo de usuario lo regresamos como usuario en modelos de usuarios linea 58
        usuario : req.usuario._id
    }

    //  Llenar Categoria
    const evento = await new Evento( data )

    //  Guardar DB
    await evento.save()

    //  Enviar Respuesta
    res.status(201).json(evento)

}

const actualzarEvento = async( req, res = response ) =>{

    //  Recibir Parametros
    const { id } = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const { estado, usuario , ...data } = req.body


    //  Si el titulo y las notas existen Regresalos en Mayuscuslas
    if ( data.title && data.notes ){
        data.title = data.title.toUpperCase()
        data.notes = data.notes.toUpperCase()
    }

    //  Busca el ID y con los datos actualizalos
    const evento = await Evento.findByIdAndUpdate(id, data, {new : true})

    res.json( evento )

}

const borrarEvento = async( req, res = response ) =>{

    const { id } = req.params

    const evento = await Evento.findByIdAndUpdate( id , { estado : false }, { new : true } )

    res.status(200).json({ 

        msg : 'Evento Borrado',
        evento
        
    })

}


module.exports = {

    obtenerEvento,
    crearEvento,
    actualzarEvento,
    borrarEvento
}