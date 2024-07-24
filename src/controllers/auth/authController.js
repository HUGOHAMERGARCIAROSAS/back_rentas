// const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const { config, sql } = require("../../config/database");

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

    const request = new sql.Request();
    request.input("PerLogin", sql.VarChar(20), per_login);
    const result = await request.query(
      "SELECT * FROM usuario WHERE per_login = @PerLogin"
    );

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).send("Invalid email or password 1");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password 2");
    }

    const token = generateToken(user.per_codigo);

    return res.status(200).json({ token });

  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
};

module.exports = { login };
