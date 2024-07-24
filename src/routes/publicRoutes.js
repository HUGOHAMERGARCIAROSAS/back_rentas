const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth/authController");

// Ruta de inicio de sesión
router.post("/login", login);

module.exports = router;
