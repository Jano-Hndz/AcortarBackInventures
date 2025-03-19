const {Router} = require('express')
const {check} = require ('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router()

const {CrearUsuario,LoginUsuario,RevalidarToken}=require('../controllers/auth')


router.post('/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ]
    ,CrearUsuario)

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ]
    ,LoginUsuario)

router.get('/renew',validarJWT,RevalidarToken)



module.exports = router