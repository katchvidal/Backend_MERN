const { response } = require("express")
const JWT = require('jsonwebtoken')
const Usuario = require('../models/usuario')

//  Esta Funcion es Practica si queremos realizar una Renovacion de Token
const validarRJWT = (req, res = response , next) => {

    //  Recoger el token por el Header( x-token )
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok : false,
            msg: 'No se encontro token en la peticion'
        })
    }

    try {
        
        const payload = JWT.verify(

            token,
            process.env.SECRETORPRIVATEKEY

        )

        req.uid = payload.uid

    } catch (error) {
        return res.status(401).json({
            ok : false,
            msg : 'token no valido'
        })
    }

    next()

}


//  Esta Funcion es Practica si queremos verificar si viene un token por el header
const validatejwt = async(req, res = response, next) => {

    //  Recoger el JWT del Header
    const token = req.header('x-token');

    //  Si no hay token no hay autorizacion
    if(!token){
        return res.status(401).json({
            msg : 'No se Encontro Token Valido - No tiene Autorizacion'
        })
    }

    try {

        //  Si viene el Token hay que comprarlo con token valido
        const { uid }  =  JWT.verify(token , process.env.SECRETORPRIVATEKEY)

        
        //  Buscamos el usuario authenticado
        const usuario = await Usuario.findById(uid)

        //  Verificar que exista el usuario
        if(!usuario){
            return res.status(401).json({
                msg : 'Token no valido'
            })            
        }

        //  Verificar si el usuario esta activo/no activo
        if(!usuario.estado){
            return res.status(401).json({
                msg : 'Token No valido'
            })
        }


        //  Lo almacenamos en la request
        req.usuario = usuario

        //  Si todo es correcto continue las validaciones check() -> check().....
        next();
        
    } catch (error) {
        
        //  Si el token no es valido o esta modificado -> 
        console.log(error);
        res.status(401).json({
            msg : 'No Valid Token no Authorizen'
        })

    }

}


module.exports ={
    validarRJWT,
    validatejwt
}