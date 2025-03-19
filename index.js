const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config_nosql');



// Crear el servidor de express
const app = express();


// Base de datos No SQL
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
