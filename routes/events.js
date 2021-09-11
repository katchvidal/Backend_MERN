const { Router } = require("express");

//  Middleware
const { validate } = require('../middlewares/expressValidator')
const { check } = require("express-validator");
const { validatejwt } = require("../middlewares/validarRJWT");


//  Controladores
const { crearEvento, obtenerEvento, actualzarEvento, borrarEvento } = require("../controllers/events");
const { EventoExists } = require("../helpers/databaseValidator");


//  Contiene toda la Funcionalidad de Router
const router = Router();

//  Rutas
router.get('/obtener', obtenerEvento)

router.post('/crear',[
    validatejwt,
    check('title', 'Titulo es requerido').not().isEmpty(),
    check('start', 'Fecha inicial es requerida').not().isEmpty(),
    check('start', 'debe ser una fecha').isDate(),
    check('end', 'Fecha final es requerida').not().isEmpty(),
    check('end', 'debe ser una fecha').isDate(),
    validate
], crearEvento )

router.put('/actualizar/:id', [
    validatejwt,
    check('id').custom( EventoExists ),
    validate
], actualzarEvento )

router.delete('/borrar/:id',[
    validatejwt,
    check('id').custom( EventoExists ),
    validate
] ,borrarEvento)

module.exports = router;