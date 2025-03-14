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
import ProductsMongoManager from '../managers/ProductsMongoManager.js';

const router = Router();

//* GET ALL CARTS **********************************************/
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
			// return res.render('error', {
			// 	error: 'Cart not found - The cart with the specified ID does not exist',
			// 	details: 'Please try again with a different ID',
			// });
			return res.status(404).json({
				message: 'Cart not found - The cart with the specified ID does not exist',
				error: true,
				payload: null,
			});
		}
		return res.status(200).json({
			message: 'Cart retrieved successfully',
			error: false,
			payload: cart,
		});
	} catch (error) {
		// return res.render('error', {
		// 	error: 'Internal Server Error',
		// 	details: error.message,
		// });
		return res.status(500).json({
			message: `Internal Server Error - ${error}`,
			error: true,
			payload: null,
		});
	}
});

//* CREATE a new empty cart ************************************/
router.post('/', async (req, res) => {
	try {
		// Get the next ID for the product from the counter
		const nextId = await CountersMongoManager.incrementCounter('cartId');

		// Create the new product with the data from the request plus the ID
		const cart = {
			id: nextId,
			products: [],
			total: 0,
		};

		// Save the cart
		const newCart = await CartsMongoManager.create(cart);

		// Response
		res.status(201).json({
			message: 'cart created successfully',
			error: false,
			payload: newCart,
		});

		// show the product in the view	product.handlebars
		// res.render('product', { title: 'Product', product: newProduct });
	} catch (error) {
		// if (error.code === 11000) {
		// 	const duplicateField = Object.keys(error.keyPattern)[0];

		// 	return res.render('error', {
		// 		error: `A cart with this ${duplicateField} already exists`,
		// 		details: 'Please try again  with a different one',
		// 	});
		// }

		// res.render('error', {
		// 	error: 'Internal Server Error',
		// 	details: error.message,
		// });
		return res.status(500).json({
			message: `Internal Server Error - ${error}`,
			error: true,
			payload: null,
		});
	}
});

//* POST A PRODUCT IN AN EXISTING CART ************************/
router.post('/:cid/product/:pid', async (req, res) => {
	const cartId = parseInt(req.params.cid);
	const productId = parseInt(req.params.pid);

	try {
		// Find the product
		// const product = products.find((prod) => prod.id === productId);
		const product = await ProductsMongoManager.getById(productId);

		// If the product is not found, return an error
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
				error: true,
				payload: null,
			});
		}

		// Find the cart
		// let cart = carts.find((c) => c.id === cartId);
		let cart = await CartsMongoManager.getById(cartId);

		// If the cart is not found, return an error
		if (!cart) {
			return res.status(404).json({
				message: 'Cart not found',
				error: true,
				payload: null,
			});
		}

		// If the cart exists, add the product to the cart
		// Find the product in the cart first
		const productInCart = cart.products.find(
			(prod) => String(prod.product._id) === String(product._id)
		);

		// If the product is already in the cart, increment the quantity
		if (productInCart) {
			productInCart.quantity += 1;
			productInCart.totalProduct = productInCart.quantity * product.price;
		} else {
			// If the product is not in the cart, add it
			cart.products.push({
				product: product._id,
				quantity: 1,
				totalProduct: product.price,
			});
		}
		cart.totalCart = cart.products.reduce((acc, curr) => acc + curr.totalProduct, 0);

		const updatedCart = await CartsMongoManager.update(cart);

		return res.status(201).json({
			message: 'product successfully added to cart ',
			error: false,
			payload: updatedCart,
		});
	} catch (error) {
		return res.status(500).json({
			message: `Internal Server Error - ${error}`,
			error: true,
			payload: null,
		});
	}
});

//* DELETE A PRODUCT IN AN EXISTING CART ************************/
router.delete('/:cid/product/:pid', async (req, res) => {
	const { cartId, productId } = req.params;

	try {
		// Find the cart
		const cart = await CartsMongoManager.getById(req.params.cid);

		// If the cart is not found, return an error
		if (!cart) {
			return res.status(404).json({
				message: 'Cart not found',
				error: true,
				payload: null,
			});
		}

		// Find the product
		const product = await ProductsMongoManager.getById(req.params.pid);

		// If the product is not found, return an error
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
				error: true,
				payload: null,
			});
		}

		// Find the product in the cart
		const productInCart = cart.products.find(
			(prod) => String(prod.product._id) === String(product._id)
		);

		// If the product is not in the cart, return an error
		if (!productInCart) {
			return res.status(404).json({
				message: 'Product not found in cart',
				error: true,
				payload: null,
			});
		}

		// Reduce the quantity or remove the product in the cart
		if (productInCart.quantity === 1) {
			cart.products = cart.products.filter(
				(prod) => String(prod.product._id) !== String(product._id)
			);
		} else {
			productInCart.quantity -= 1;
			productInCart.totalProduct = productInCart.quantity * product.price;
		}

		// Update the total cart
		cart.totalCart = cart.products.reduce((acc, curr) => acc + curr.totalProduct, 0);

		// Update the cart
		const updatedCart = await CartsMongoManager.update(cart);

		return res.status(201).json({
			message: 'product successfully subtracted from cart ',
			error: false,
			payload: updatedCart,
		});
	} catch (error) {
		return res.status(500).json({
			message: `Internal Server Error - ${error}`,
			error: true,
			payload: null,
		});
	}
});

export default router;
