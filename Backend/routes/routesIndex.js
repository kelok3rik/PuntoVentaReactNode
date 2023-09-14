import { Router } from 'express';
import { pool } from '../DATABASE/db.js';

const router = Router(); // Crea una instancia de Router

router.get('/employers', async (req, res) => {
  const [result] = await pool.query('CALL LeerUsuarios()');

  const result2 = result[0];

  console.log(result2);

  res.send(result2);
});


export default router;