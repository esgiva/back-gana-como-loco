const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'El código es requerido'],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['registrado', 'validado', 'rechazado'],
        default: 'registrado'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Code', codeSchema);