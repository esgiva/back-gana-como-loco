const express = require('express');
const router = express.Router();
const {
    loginUser,
    createUser,
    createAdmin,
    getParticipants,
    registerCode,
    getCodes,
    changePassword
} = require