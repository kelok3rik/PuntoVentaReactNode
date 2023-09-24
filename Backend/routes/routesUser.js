import { Router } from 'express';
import { pool } from '../DATABASE/db.js';
import { getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser } from '../controllers/controllerUser.js';

const router = Router(); // Crea una instancia de Router

router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
router.post('/users', createUser);

// PRUEBA

router.put('/users', updateUser);

//





// router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);



export default router;