import express from 'express';
const router = express.Router();

// Enrutadores
import routesEmployer from './routes/routesEmployer.js';
import routesUser from './routes/routesUser.js';


// Rutas
router.use('/employer', routesEmployer);
router.use('/user', routesUser);


// Ruta principal
router.get('/', (req, res) => {
  res.send('Ruta principals');
  
  
});

 
export default router;