const express = require('express');
const router = express.Router();

const conexion = require('./DATABASE/db.js');



//ruta para mostrar basico
router.get('/', (req, res) => {

    res.send('cabra a tiguere');

})


module.exports = router;