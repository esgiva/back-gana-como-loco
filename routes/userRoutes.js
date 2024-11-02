const express = require('express');
const router = express.Router();
const {
    loginUser,createUser,createAdmin,getParticipants,registerCode,getCodes,changePassword} = require ('../controllers/userController');

router.post('/login', loginUser);
router.post('/createUser', createUser);
router.post('/createAdmin', createAdmin);
router.post('/getPartip', getParticipants);
router.post('/newCode', registerCode);
router.get('/mostCode', getCodes);
router.post('/change-password', changePassword);

module.exports = router;