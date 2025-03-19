const {response} = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario')



const CrearUsuario = async(req,res=response)=>{
    
    const { email, password } = req.body;

    try {

        let usuario_re = await Usuario.findOne({ email });

        if ( usuario_re ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        const usuario=new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save()

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );


        return res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            rol: "admin",
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Hable con el admin al correo alejandro.ignacio.hernandez1998@gmail.com'
        })
    }
    
}

const LoginUsuario = async (req,res=response)=>{
    const { email, password } = req.body;

    try {       
        // Desencriptar para poder comparar las constraseñas
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Desencriptar para poder comparar las constraseñas
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol:usuario.rol,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador al correo alejandro.ignacio.hernandez1998@gmail.com'
        });
    }

}

const RevalidarToken=async(req,res=response)=>{
    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    const usuarioObj = await Usuario.findById( uid );


    res.json({
        ok: true,
        uid, 
        name,
        rol: usuarioObj.rol,
        token
    })
}



module.exports={
    CrearUsuario,
    LoginUsuario,
    RevalidarToken
}