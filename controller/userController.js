const User = require('../models/User');
const Code = require('../models/Code');

// Login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

// Crear usuario
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear usuario',
            error: error.message
        });
    }
};

// Crear admin
const createAdmin = async (req, res) => {
    try {
        const adminData = { ...req.body, role: 'admin' };
        const newAdmin = await User.create(adminData);
        res.status(201).json({
            success: true,
            message: 'Administrador creado exitosamente',
            data: newAdmin
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear administrador',
            error: error.message
        });
    }
};

// Obtener participantes
const getParticipants = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener participantes',
            error: error.message
        });
    }
};

// Registrar código
const registerCode = async (req, res) => {
    try {
        const newCode = await Code.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Código registrado exitosamente',
            data: newCode
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al registrar código',
            error: error.message
        });
    }
};

// Obtener códigos
const getCodes = async (req, res) => {
    try {
        const codes = await Code.find().populate('user');
        res.json({
            success: true,
            data: codes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener códigos',
            error: error.message
        });
    }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== oldPassword) {
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña actual incorrectos'
            });
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Contraseña actualizada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar contraseña',
            error: error.message
        });
    }
};

module.exports = {
    loginUser,
    createUser,
    createAdmin,
    getParticipants,
    registerCode,
    getCodes,
    changePassword
};