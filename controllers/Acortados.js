const { response } = require("express");

const Acortados = require("../models/Acortados");
const Usuario = require("../models/Usuario");
const { generateUniqueShortUrl } = require("../helpers/UniqueShortURL");

const NewURLAcortado = async (req, res = response) => {
    try {
        console.log(123);

        const { flagcustomUrl, customUrl, FlagLogin, URL, user } = req.body;
        console.log(req.body);

        let URLAcortado;
        console.log(123);

        if (flagcustomUrl) {
            if (!customUrl) {
                return res
                    .status(400)
                    .json({ ok: false, msg: "Custom URL requerida" });
            }
            const exists = await Acortados.findOne({ URLAcortado: customUrl });
            if (exists) {
                return res.json({ ok: true, save: false });
            }
            URLAcortado = customUrl;
        } else {
            let isUnique = false;
            while (!isUnique) {
                URLAcortado = generateUniqueShortUrl(5);
                const exists = await Acortados.findOne({ URLAcortado });
                if (!exists) {
                    isUnique = true;
                }
            }
        }

        const nuevoAcortado = new Acortados({
            Usuario: FlagLogin ? user.uid: null,
            URLOriginal: URL,
            URLAcortado,
            Invitado: !FlagLogin,
        });

        await nuevoAcortado.save();

        res.json({ ok: true, save: true, data: URLAcortado });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const RedirectURL = async (req, res = response) => {
    try {

        const { urlid} = req.body;

        // Buscar el documento en la base de datos
        const acortado = await Acortados.findOne({ URLAcortado: urlid });

        if (!acortado) {
            return res.json({ ok: true, disponible: false });
        }

        // Verificar si el enlace ha expirado
        if (new Date() > acortado.FechaExperacion) {
            return res.json({ ok: true, disponible: false });
        }

        // Incrementar el contador de vistas
        acortado.vistas += 1;
        await acortado.save();

        return res.json({
            ok: true,
            disponible: true,
            URLOriginal: acortado.URLOriginal,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const GetPanelControl = async (req, res = response) => {
    try {
        const IdUser = req.uid

        console.log(IdUser);
        

        const DataAcortados = await Acortados.find({ Usuario: IdUser });
        
        return res.json({
            ok: true,
            DataAcortados
        });
    

        return res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};


const RenovarAcotador = async (req, res = response) => {
    try {
        const { id } = req.body;
        
        const FechaExperacionNew = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))
        const acortado = await Acortados.findByIdAndUpdate(id, {
            FechaExperacion: FechaExperacionNew
        }, { new: true });
        
        if (!acortado) {
            return res.status(404).json({ ok: false, msg: "No se encontró el acortador" });
        }
        
        return res.json({
            ok: true,
            FechaExperacionNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const EliminarAcotador = async (req, res = response) => {
    try {
        const { id } = req.body;
        

        const acortado = await Acortados.findByIdAndDelete(id);
        
        if (!acortado) {
            return res.status(404).json({ ok: false, msg: "No se encontró el acortador" });
        }
        
        return res.json({
            ok: true,
            msg: "Acortador eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

module.exports = {
    NewURLAcortado,
    RedirectURL,
    GetPanelControl,
    EliminarAcotador,
    RenovarAcotador
};
