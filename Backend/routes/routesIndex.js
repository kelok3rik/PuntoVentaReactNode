import { Router } from 'express';
import { pool } from '../DATABASE/db.js';

const router = Router(); // Crea una instancia de Router

router.get('/', (req, res) => {
  res.send('Ruta de Employer');
});


export default router;