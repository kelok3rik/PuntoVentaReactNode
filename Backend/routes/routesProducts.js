import { Router } from 'express';
import { pool } from '../DATABASE/db.js';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/controllerProducts.js';

const router = Router(); // Crea una instancia de Router

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products', updateProduct);

router.delete('/products', deleteProduct);

export default router;