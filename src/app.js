// crear estructura basica de express

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// definir el puerto 
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


module.exports = app;



