const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener información del usuario (privada)
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// Otra ruta privada
router.post('/settings', authMiddleware.verifyToken, userController.updateSettings);

module.exports = router;