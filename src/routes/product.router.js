/**
 * This file contains the routes for the products
 * Here we have the CRUD operations for the products
 * Returns renderized pages insead of JSON
 */
import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import { uploader } from '../utilsMulter.js';
import ProductsMongoManager from '../managers/ProductsMongoManager.js';
import CountersMongoManager from '../managers/CountersMongoManager.js';

const router = Router();

// GET all product  -------------------------------------------------------------------------------
router.get('/', async (req, res) => {
	try {
		const products = await ProductsMongoManager.get();

		if (!products) {
			return res.render('error', {
				error: 'Error retrieving products',
				details: 'Please try again',
			});
		}

		// show the products in the view products.handlebars
		res.render('products', {
			title: 'Products',
			products: products,
		});
	} catch (error) {
		console.error(error);

		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

// GET a product by id -------------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
	try {
		const product = await ProductsMongoManager.getById(req.params.id);

		if (!product) {
			return res.render('error', {
				error: 'Product not found - The product with the specified ID does not exist',
				details: 'Please try again with a different ID',
			});
		}

		// show the product in the view	product.handlebars
		res.render('product', { title: 'Product', product: product });
	} catch (error) {
		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

//CREATE a new product -------------------------------------------------------------------------------
router.post('/', uploader.single('file'), async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;

	const thumbnail = req.file
		? '/img/' + req.file.filename
		: 'https://prd.place/400?id=14';

	try {
		// Get the next ID for the product from the counter
		const nextId = await CountersMongoManager.incrementCounter('productId');

		// Create the new product with the data from the request plus the ID
		const product = {
			id: nextId,
			title,
			description,
			code,
			price,
			stock,
			category,
			thumbnail,
		};

		// Save the product
		const newProduct = await ProductsMongoManager.create(product);

		// show the product in the view	product.handlebars
		res.render('product', { title: 'Product', product: newProduct });
	} catch (error) {
		if (error.code === 11000) {
			const duplicateField = Object.keys(error.keyPattern)[0];

			return res.render('error', {
				error: `A product with this ${duplicateField} already exists`,
				details: 'Please try again  with a different one',
			});
		}

		res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

// DELETE ---------------------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
	try {
		const product = await ProductModel.findByIdAndDelete(req.params.id);

		if (!product) {
			return res.render('error', {
				error:
					'Error deleting product - The product with the specified ID does not exist',
				details: 'Please try again with a different ID',
			});
		}

		// show the product in the view	product.handlebars
		return res.redirect('/products');
	} catch (error) {
		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

export default router;
