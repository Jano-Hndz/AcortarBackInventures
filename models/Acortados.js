const { Schema, model } = require('mongoose');

const AcortadosSchema = Schema({
    Usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    URLOriginal: {
        type: String,
        required: true
    },
    URLAcortado: {
        type: String,
        required: true
    },
    FechaExperacion: {
        type: Date,
        default: () => new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))
    },
    FechaCreacion: {
        type: Date,
        default: () => new Date()
    },
    Invitado: {
        type: Boolean,
        default: false
    },
    vistas: {
        type: Number,
        default: 0 
    }
});

module.exports = model('Acortados', AcortadosSchema);