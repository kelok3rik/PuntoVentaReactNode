
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/routesUser.js';
import indexRoutes from './routes/routesIndex.js';
import productsRoutes from './routes/routesProducts.js';

// import {employerRoutes} from './routes/routesEmployer.js';


const corsOptions = {
    origin: "http://127.0.0.1:5173",
};

const app = express();
app.use(cors(corsOptions));


// Configurar body-parser para analizar JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Asignacion de rutas a la aplicacion
app.use(userRoutes);
app.use(indexRoutes);
app.use(productsRoutes);

// Inicializacion del servidor
app.listen(5000, () => {
    console.log("Esta corriendo en puerto 5000 http://localhost:5000");
});

