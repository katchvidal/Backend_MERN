const { Router } = require("express");
const { login, registro, revalidarToken } = require("../controllers/auth");

//  Contiene toda la Funcionalidad de Router
const router = Router();

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");
const { validate } = require("../middlewares/expressValidator");
const { AlreadyEmail } = require("../helpers/databaseValidator");
const { validarRJWT } = require("../middlewares/validarRJWT");


//  Path, MiddleWare, Controller
router.get('/login', [

    check('email', 'Email Required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate

] ,login)

router.post('/registro',[

    check('email').custom(AlreadyEmail),
    check('name', 'Nombre es Rquerido ').not().isEmpty(),
    check('password', 'Password es Rquerido ').not().isEmpty(),
    check('password', 'Password Requiere minimo seis Caracteres ').isLength({min:6}),
    validate

], registro)


router.get('/renew', [
    validarRJWT
], revalidarToken)


module.exports = router;