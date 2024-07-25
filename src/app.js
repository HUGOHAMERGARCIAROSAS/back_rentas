// crear estructura basica de express

const express = require("express");
const { connectToDatabase } = require("./config/database"); // Asegúrate de que la ruta sea correcta

const app = express();
const cors = require("cors");
const routes = require("./routes");

connectToDatabase();

app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto a tu origen
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(routes);
