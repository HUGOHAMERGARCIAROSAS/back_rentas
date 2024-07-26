
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { config, sql } = require("../../config/database");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Función para generar JWT
const generateToken = (per_codigo) => {
  return jwt.sign({ id: per_codigo }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const login = async (req, res) => {
  try {

    const { per_login, password } = req.body;
    if (!per_login || !password) {
      return res.status(400).send('All input is required');
    }

    const pool = await sql.connect(config);

    const request = pool.request();
    request.input("per_login", sql.VarChar(20), per_login);
    request.input("tipo", sql.Int, 1);
    const result = await request.execute(
      'sp_usuario'
    );

    const user = result?.recordset[0];
    if (!user) {
      return res.status(401).send('Invalid email or password 1');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password 2');
    }

    delete user.password;

    const token = generateToken(user.per_codigo);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error during login:", err.message);
    console.error("Error stack trace:", err.stack);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { login };
