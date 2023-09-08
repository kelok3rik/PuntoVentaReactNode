const express = require('express');
const router = express.Router();

const conexion = require('../DATABASE/db.js');


router.get('/', async (req, res) => {
    const result = await conexion.query('SELECT * FROM usuarios', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
            console.log(filas);
        }
    })
})


module.exports = router;