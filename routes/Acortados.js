const {Router} = require('express')
const { validarJWT } = require('../middlewares/validar-jwt');
const {NewURLAcortado,RedirectURL} =  require('../controllers/Acortados')

const router = Router();




router.post('/new',NewURLAcortado)

router.post('/redirect',RedirectURL)







module.exports = router