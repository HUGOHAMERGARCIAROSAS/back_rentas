// crear estructura basica de express

const express = require('express');
const { connectToDatabase } = require('./config/database'); // Asegúrate de que la ruta sea correcta



const app = express();
const routes = require('./routes');


// Conectar a la base de datos
connectToDatabase();

// Resto de la configuración de Express y rutas...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.use(express.json()); // Middleware para parsear JSON
app.use(routes); // Usar todas las rutas definidas

// Middleware de manejo de errores
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

