const {Router} = require('express')
const { validarJWT } = require('../middlewares/validar-jwt');
const {GetPanelControl,EliminarAcotador,RenovarAcotador} =  require('../controllers/Acortados')

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );




router.post('/panelcontrol',GetPanelControl)

router.post('/eliminar',EliminarAcotador)

router.post('/renovar',RenovarAcotador)




module.exports = router