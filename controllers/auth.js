const { response } = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJwt } = require("../helpers/generarJWT");

const login = async(req, res = response) => {

    const {password , email} = req.body;

    try {

        //  Verificar Email pero instanceamos constante usuario con todas las propiedades del Usuario(password, estado, ...etc )
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                msg : ' Email or Password Incorrect - Not Register '
            })
        }

        //  Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg : ' Email or Password Incorrect - Not register '
            })
        }

        //  Verficar contraseña
        const validpass = bcryptjs.compareSync(password, usuario.password)
        if(!validpass){
            return res.status(400).json({
                msg : ' email or password are incorrect - Password Incorrect '
            })
        }

        //  Generar JWT
        const token = await generarJwt(usuario.id)

        res.json({
            msg : 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : 'Talk to BackDev something Wrong'
        })
    }

}

const registro = async( req, res = response) => {

    //  Parametros sumistrados en el BODY
    const {name, email, password , rol} = req.body;

    //  Peticiones del Body se introduce al Modelo
    const usuario = new Usuario({name, email, password , rol});

    //  Encriptar Contraseña Hash
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //  Generar JWT -> JSON WEB TOKEN
    const token = await generarJwt(usuario.id)

    //  Salvar en Base de datos
    await usuario.save();

    res.json({

        message : ' Metodo Post para Creacion de Usuarios ',
        usuario,
        token

    })

}

const revalidarToken = async( req, res = response) => {

    //  Como recibimos del Middleware el token con el ID -> extramos de la request
    const uid = req.uid

    //  Generamos Nuevamente el token con el uid proveniente del token anterior
    const token = await generarJwt( uid )

    res.json({

        token

    })

}


module.exports = {
    login,
    registro,
    revalidarToken
}