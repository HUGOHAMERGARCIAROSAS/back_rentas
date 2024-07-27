const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

router.post('/settings', authMiddleware.verifyToken, userController.updateSettings);

module.exports = router;