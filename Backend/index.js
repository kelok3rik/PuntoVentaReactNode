
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/routesUser.js';
import indexRoutes from './routes/routesIndex.js';

// import {employerRoutes} from './routes/routesEmployer.js';


const corsOptions = {
    origin: "http://127.0.0.1:5173",
};

const app = express();
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Asignacion de rutas a la aplicacion
app.use(userRoutes);
app.use(indexRoutes);

// Inicializacion del servidor
app.listen(5000, () => {
    console.log("Esta corriendo en puerto 5000 http://localhost:5000");
});

