const { validationResult } = require('express-validator')


const validate = (req, res , next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    //  Realizada la validacion anterior continua con el siguiente Middleware de los 'CHECK' -> 'CHECK' ...
    next();

}


module.exports = {
    validate
}