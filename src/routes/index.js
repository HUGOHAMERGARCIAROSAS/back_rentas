const express = require('express');
const publicRoutes = require('./publicRoutes');
// const privateRoutes = require('./privateRoutes');

const router = express.Router();

// Rutas públicas
router.use('/api/public', publicRoutes);

// // Rutas privadas (requieren autenticación)
// router.use('/api/private', privateRoutes);

module.exports = router;