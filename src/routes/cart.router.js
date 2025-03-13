/**
 * This file contains the routes for the cart API.
 * It defines the routes for creating, retrieving, and updating carts.
 * The routes are defined using the Express.js router.
 * The router is imported from the Express.js module.
 * The file reads the products data from a JSON file.
 */

import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import CartsMongoManager from '../managers/CartsMongoManager.js';
import CountersMongoManager from '../managers/CountersMongoManager.js';

const router = Router();

// GET ALL CARTS ------------------------------------------------------
router.get('/', async (req, res) => {
	try {
		const carts = await CartsMongoManager.get();
		if (!carts) {
			return res.render('error', {
				error: 'Error retrieving carts',
				details: 'Please try again',
			});
		}

		return res.status(200).json({
			message: 'Carts retrieved successfully',
			error: false,
			payload: carts,
		});
	} catch (error) {
		console.error(error);

		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

//* GET A CART BY ID **********************************************/
router.get('/:cid', async (req, res) => {
	try {
		const cart = await CartsMongoManager.getById(req.params.cid);
		if (!cart) {
			return res.render('error', {
				error: 'Cart not found - The cart with the specified ID does not exist',
				details: 'Please try again with a different ID',
			});
		}
		return res.status(200).json({
			message: 'Cart retrieved successfully',
			error: false,
			payload: cart,
		});
	} catch (error) {
		return res.render('error', {
			error: 'Internal Server Error',
			details: error.message,
		});
	}
});

//CREATE a new cart -------------------------------------------------------------------------------
router.post('/', uploader.single('file'), async (req, res) => {
	const { title, description, code, price, status = true, stock, category } = req.body;

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
			status,
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

//* POST A CART WITH ONE OR SEVERAL PRODUCTS **********************/
router.post('/', async (req, res) => {
	const { products } = req.body;

	// Validate that product is a valid array
	if (!Array.isArray(products) || products.length === 0) {
		return res.status(404).json({
			message: 'Product array is invalid or empty',
			error: true,
			payload: null,
		});
	}

	// Validate that each product has Idproduct and Quantity as numbers
	if (
		products.some(
			(product) =>
				typeof product.idProduct !== 'number' || typeof product.quantity !== 'number'
		)
	) {
		return res.status(404).json({
			message: "Each product must have 'idProduct' and 'quantity' as a numbers",
			error: true,
			payload: null,
		});
	}

	// read data from file
	const carts = await fileManagerCarts.getData();

	// Generate a new ID based on the current number of carts
	const newCartId = carts.length + 1;

	// Create the new cart
	const newCart = { id: newCartId, products };

	// Add the cart to Array
	carts.push(newCart);

	// Save the updated array of products to the json file
	// writeData(fileCarts, carts);
	fileManagerCarts.saveData(carts);

	return res.status(201).json({
		message: 'cart created successfully and product added to cart',
		error: false,
		payload: newCart,
	});
});

//* POST A NEW CART WITH JUST ONE PRODUCT *************************/
router.post('/product/:pid', async (req, res) => {
	const productId = parseInt(req.params.pid);

	// read data from file
	const products = await fileManagerProducts.getData();

	// Find the product
	const product = products.find((prod) => prod.id === productId);
	// If the product is not found, return an error
	if (!product) {
		return res.status(404).json({
			message: 'Product not found',
			error: true,
			payload: null,
		});
	}

	// read data from file
	const carts = await fileManagerCarts.getData();

	const newCart = {
		id: carts.length + 1,
		products: [{ idProduct: productId, quantity: 1 }],
	};

	// Add the new cart to the array
	carts.push(newCart);

	// Save the updated array of products to the json file
	// writeData(fileCarts, carts);
	fileManagerCarts.saveData(carts);

	return res.status(201).json({
		message: 'cart created successfully and product added to cart',
		error: false,
		payload: newCart,
	});
});

//* POST A NEW PRODUCT IN AN EXISTING CART ************************/
router.post('/:cid/product/:pid', async (req, res) => {
	const cartId = parseInt(req.params.cid);
	const productId = parseInt(req.params.pid);

	// read data from file
	const products = await fileManagerProducts.getData();

	// Find the product
	const product = products.find((prod) => prod.id === productId);
	// If the product is not found, return an error
	if (!product) {
		return res.status(404).json({
			message: 'Product not found',
			error: true,
			payload: null,
		});
	}
	// read data from file
	const carts = await fileManagerCarts.getData();

	// Find the cart
	let cart = carts.find((c) => c.id === cartId);

	// If the cart is not found, create a new one
	if (!cart) {
		const newCart = {
			id: carts.length + 1,
			products: [{ idProduct: productId, quantity: 1 }],
		};

		// Add the new cart to the array
		carts.push(newCart);

		// Save the updated array of products to the json file
		// writeData(fileCarts, carts);
		fileManagerCarts.saveData(carts);

		return res.status(201).json({
			message: 'cart created successfully and product added to cart',
			error: false,
			payload: newCart,
		});
	}

	// If the cart exists, add the product to the cart
	// Find the product in the cart first
	const productInCart = cart.products.find((prod) => prod.idProduct === productId);

	// If the product is already in the cart, increment the quantity
	if (productInCart) {
		productInCart.quantity += 1;
	} else {
		// If the product is not in the cart, add it
		cart.products.push({ idProduct: productId, quantity: 1 });
	}

	// Save the updated array of products to the json file
	// writeData(fileCarts, carts);
	fileManagerCarts.saveData(carts);

	return res.status(201).json({
		message: 'product successfully added to cart ',
		error: false,
		payload: cart,
	});
});

export default router;
