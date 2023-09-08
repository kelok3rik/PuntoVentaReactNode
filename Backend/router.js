const express = require('express');
const router = express.Router();

// Enrutadores
const routesEmployer = require('./routes/routesEmployer');
const routesUser = require('./routes/routesUser');

// Rutas
router.use('/employer', routesEmployer);
router.use('/user', routesUser);


// Ruta principal
router.get('/', (req, res) => {
  res.send('Ruta principal');
});

 
module.exports = router;