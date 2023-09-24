import { Router } from 'express';
import { pool } from '../DATABASE/db.js';
import {
        getUsers,
        createUser,
        updateUser,
        deleteUser
} from '../controllers/controllerUser.js';

const router = Router(); // Crea una instancia de Router

router.get('/users', getUsers);

router.post('/users', createUser);

router.put('/users', updateUser);

router.delete('/users', deleteUser);



export default router;