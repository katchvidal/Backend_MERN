const jwt = require('jsonwebtoken')


const generarJwt = function(    uid = ''    ){

    return new Promise ((resolve , reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '4h'
        }, (err, token) => {


            if(err){
                console.log(err)
                reject('No se Pudo Generar Token')
            }else{
                resolve(token)
            }

        })

    })
}

module.exports ={ 
    generarJwt
}