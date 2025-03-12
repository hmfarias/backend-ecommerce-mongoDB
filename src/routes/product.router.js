/**
 * This file contains the routes for the products
 * Here we have the CRUD operations for the products
 * Returns renderized pages insead of JSON
 */
import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import mongoose from 'mongoose';
import { incrementCounter } from '../utils/handleCounters.js';
import { uploader } from '../utilsMulter.js';

const router = Router();

const categoryList = [
	'beauty',
	'fragrances',
	'furniture',
	'groceries',
	'home-decoration',
	'kitchen-accessories',
	'laptops',
	'mens-shirts',
	'mens-shoes',
	'mens-watches',
	'mobile-accessories',
	'motorcycle',
	'skin-care',
	'smartphones',
	'sports-accessories',
	'sunglasses',
	'tablets',
	'tops',
	'vehicle',
	'womens-bags',
	'womens-dresses',
	'womens-jewellery',
	'womens-shoes',
	'womens-watches',
];

//CREATE a new product -------------------------------------------------------------------------------
// uploader.single('file') indicates that the file will be uploaded
router.post('/', uploader.single('file'), async (req, res) => {
	const {
		title,
		description,
		code = 'RCH45Q1A',
		price,
		status = true,
		stock,
		category,
		// thumbnail = 'https://prd.place/400?id=14',
	} = req.body;

	const thumbnail = req.file
		? '/img/' + req.file.filename
		: 'https://prd.place/400?id=14';

	// Validate that the title is not empty
	if (!title) {
		// return res.status(400).json({
		// 	message: 'title cannot be empty',
		// 	error: true,
		// 	payload: null,
		// });
		return res.render('error', {
			error: 'title cannot be empty',
			details: 'Please try again with a different title',
		});
	}

	// Validate that the description is not empty
	if (!description) {
		// return res.status(400).json({
		// 	message: 'description cannot be empty',
		// 	error: true,
		// 	payload: null,
		// });
		res.render('error', {
			error: 'description cannot be empty',
			details: 'Please try again with a different description',
		});
	}

	// Validate that the barcode is not empty
	if (!code) {
		// return res.status(400).json({
		// 	message: 'code cannot be empty',
		// 	error: true,
		// 	payload: null,
		// });
		res.render('error', {
			error: 'code cannot be empty',
			details: 'Please try again with a different code',
		});
	}

	// Validate that the price is a positive number
	if (isNaN(price) || price <= 0 || !price) {
		// return res.status(400).json({
		// 	message: 'the price must be present and be a positive number',
		// 	error: true,
		// 	payload: null,
		// });
		res.render('error', {
			error: 'the price must be present and be a positive number',
			details: 'Please try again with a different price',
		});
	}

	// Validate that the status is a boolean
	const validStatus = typeof status === 'boolean' ? status : true;

	// Validate that the stock is a positive integer
	if (isNaN(stock) || stock <= 0 || !stock) {
		// return res.status(400).json({
		// 	message: 'stock must be a positive integer',
		// 	error: true,
		// 	payload: null,
		// });
		res.render('error', {
			error: 'stock must be a positive integer',
			details: 'Please try again with a different stock',
		});
	}

	// Validate that the category is a valid category
	if (!categoryList.includes(category) || !category) {
		// return res.status(400).json({
		// 	message:
		// 		'category must be present and be one of: beauty , fragrances , furniture , groceries , home-decoration , kitchen-accessories , laptops , mens-shirts , mens-shoes , mens-watches , mobile-accessories , motorcycle , skin-care , smartphones , sports-accessories , sunglasses , tablets , tops , vehicle , womens-bags , womens-dresses , womens-jewellery , womens-shoes , womens-watches',
		// 	error: true,
		// 	payload: null,
		// });
		res.render('error', {
			error:
				'category must be present and be one of: beauty , fragrances , furniture , groceries , home-decoration , kitchen-accessories , laptops , mens-shirts , mens-shoes , mens-watches , mobile-accessories , motorcycle , skin-care , smartphones , sports-accessories , sunglasses , tablets , tops , vehicle , womens-bags , womens-dresses , womens-jewellery , womens-shoes , womens-watches',
			details: 'Please try again with a different category',
		});
	}

	// // If Thumbnail is not received, it is left blank
	// const validThumbnail = thumbnail ? thumbnail : '';

	// // Validate that the thumbnail is a valid URL
	// if (thumbnail && !thumbnail.match(/^https?:\/\//)) {
	// 	// return res.status(400).json({
	// 	// 	message: 'thumbnail must be a valid URL',
	// 	// 	error: true,
	// 	// 	payload: null,
	// 	// });
	// 	res.render('error', {
	// 		error: 'thumbnail must be a valid URL',
	// 		details: 'Please try again with a different thumbnail',
	// 	});
	// }

	// Start a transaction
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Get the next ID inside the transaction
		const nextId = await incrementCounter(session, 'productId');

		// Create the new product
		const newProduct = new ProductModel({
			id: nextId,
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnail,
		});

		// Save the product within the transaction
		await newProduct.save({ session });

		// Commit transaction
		await session.commitTransaction();

		// response format for the api
		// return res.status(200).json({
		// 	message: 'Product retrieved successfully',
		// 	error: false,
		// 	payload: product,
		// });

		// show the product in the view	product.handlebars
		res.render('product', { title: 'Product', product: newProduct.toObject() });
	} catch (error) {
		await session.abortTransaction(); // Rollback changes

		if (error.code === 11000) {
			const duplicateField = Object.keys(error.keyPattern)[0];
			const errorMessage =
				duplicateField === 'id'
					? 'A product with this ID already exists'
					: 'A product with this title already exists';
			// return res.status(400).json({ error: errorMessage });
			return res.render('error', {
				error: errorMessage,
				details: 'Please try again with a different title',
			});
		}

		// res.status(500).json({ error: 'Internal Server Error', details: error.message });
		res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	} finally {
		session.endSession(); // Ensure session is always closed
	}
});

// READ all product  -------------------------------------------------------------------------------
router.get('/', async (req, res) => {
	try {
		const products = await ProductModel.find();

		if (!products) {
			// return res.status(404).json({
			// 	message: 'Product not found - The product with the specified ID does not exist',
			// 	error: true,
			// 	payload: null,
			// });
			return res.render('error', {
				error: 'Error retrieving products',
				details: 'Please try again',
			});
		}
		// response format for the api
		// return res.status(200).json({
		// 	message: 'Product retrieved successfully',
		// 	error: false,
		// 	payload: product,
		// });

		// show the products in the view	products.handlebars
		res.render('products', {
			title: 'Products',
			products: products.map((product) => product.toObject()),
		});
	} catch (error) {
		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

// READ a product by id -------------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
	try {
		// Validate that the id is a positive integer
		if (isNaN(req.params.id) || req.params.id <= 0) {
			res.render('error', {
				error: 'The ID must be a positive integer',
				details: 'Please try again with a different ID',
			});
		}
		const product = await ProductModel.findOne({ id: req.params.id });

		if (!product) {
			// return res.status(404).json({
			// 	message: 'Product not found - The product with the specified ID does not exist',
			// 	error: true,
			// 	payload: null,
			// });
			return res.render('error', {
				error: 'Product not found - The product with the specified ID does not exist',
				details: 'Please try again with a different ID',
			});
		}
		// response format for the api
		// return res.status(200).json({
		// 	message: 'Product retrieved successfully',
		// 	error: false,
		// 	payload: product,
		// });

		// show the product in the view	product.handlebars
		res.render('product', { title: 'Product', product: product.toObject() });
	} catch (error) {
		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

// UPDATE
router.put('/:id', (req, res) => {
	res.render('index', { title: 'Home' });
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const product = await ProductModel.findByIdAndDelete(req.params.id);

		if (!product) {
			// return res.status(404).json({
			// 	message: 'Product not found - The product with the specified ID does not exist',
			// 	error: true,
			// 	payload: null,
			// });
			return res.render('error', {
				error:
					'Error deleting product - The product with the specified ID does not exist',
				details: 'Please try again with a different ID',
			});
		}
		// response format for the api
		// return res.status(200).json({
		// 	message: 'Product deleted successfully',
		// 	error: false,
		// 	payload: product,
		// });

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
