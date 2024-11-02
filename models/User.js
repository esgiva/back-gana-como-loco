const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El username es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    fechaNacimiento: {
        type: Date
    },
    cedula: {
        type: String,
        required: [true, 'La cédula es requerida'],
        unique: true
    },
    ciudad: {
        type: String
    },
    numeroCelular: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);