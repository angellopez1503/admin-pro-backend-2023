const { Router } = require('express')
const { check } =require('express-validator')
const { getUsuarios, crearUsuario,actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/',validarJWT,getUsuarios)
router.post('/',[
 check('name','El nombre es obligatorio').not().isEmpty(),
 check('password','El password es obligatorio').not().isEmpty(),
 check('email','El email es obligatorio').isEmail(),
 validarCampos
],crearUsuario)
router.put('/:id',[
    validarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos
],actualizarUsuario)
router.delete('/:id',validarJWT,borrarUsuario)


module.exports = router
