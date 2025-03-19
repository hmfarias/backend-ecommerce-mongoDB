/**
 * This file contains the routes for the views
 * The views are the pages that the user will see
 */

import { Router } from 'express';

const router = Router();

/**
 * This route is for the home page
 */
router.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

router.get('/newProduct', (req, res) => {
	res.render('newProduct', { title: 'Create Product' });
});

router.get('/updateProduct', (req, res) => {
	res.render('updateProduct', { title: 'Update Product' });
});

export default router;
