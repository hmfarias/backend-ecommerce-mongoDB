import CartModel from '../models/cart.model.js';

class CartsMongoManager {
	// Retrieve all carts (returns a lean object for performance)
	static async get() {
		try {
			return await CartModel.find().lean();
		} catch (error) {
			console.error('Error fetching carts:', error.message);
			return [];
		}
	}

	// Create a new cart and return it as a plain object
	static async create(cart) {
		try {
			const newCart = await CartModel.create(cart);
			return newCart.toObject();
		} catch (error) {
			console.error('Error creating cart:', error.message);
			return null;
		}
	}

	// Update a cart's products and totalCart value
	static async update(cart) {
		try {
			const updatedCart = await CartModel.findOneAndUpdate(
				{ id: cart.id }, // Search for the cart by custom 'id' field
				{ $set: { products: cart.products, totalCart: cart.totalCart } }, // Update only necessary fields
				{ new: true, lean: true } // Return updated document as plain object
			);
			return updatedCart || null; // Return null if cart not found
		} catch (error) {
			console.error('Error updating cart:', error.message);
			return null;
		}
	}

	// Retrieve a single cart by its custom 'id' field
	static async getById(id) {
		try {
			const cart = await CartModel.findOne({ id }).lean();
			return cart || null; // Return null if not found
		} catch (error) {
			console.error('Error fetching cart by ID:', error.message);
			return null;
		}
	}

	// Delete a cart by its custom 'id' field
	static async delete(id) {
		try {
			const cart = await CartModel.findOneAndDelete({ id });
			return cart ? cart.toObject() : null; // Return null if not found
		} catch (error) {
			console.error('Error deleting cart:', error.message);
			return null;
		}
	}

	// Check if a cart contains a specific product (optimized for ObjectId comparisons)
	static hasProduct(cart, productId) {
		try {
			// If the cart does not exist, return false
			if (!cart) return false;

			// Ensure productId is a valid ObjectId before comparing
			return cart.products.some(
				(item) => item.product._id?.toString() === productId.toString()
			);
		} catch (error) {
			console.error('Error checking product in cart:', error.message);
			return false;
		}
	}
}

export default CartsMongoManager;

// 	static async get() {
// 		return CartModel.find().lean();
// 	}

// 	static async create(cart) {
// 		let newCart = await CartModel.create(cart);
// 		return newCart.toObject();
// 	}

// 	static async update(cart) {
// 		const updatedCart = await CartModel.findOneAndUpdate(
// 			{ id: cart.id }, //find for the product with the specified id
// 			{ $set: { products: cart.products, totalCart: cart.totalCart } }, // Update only these fields
// 			{ new: true } // Retorna el documento actualizado
// 		);
// 		return updatedCart ? updatedCart.toObject() : null;
// 	}

// 	static async getById(id) {
// 		const cart = await CartModel.findOne({ id: id });
// 		return cart ? cart.toObject() : null; // avoid error if cart is null
// 	}

// 	static async delete(id) {
// 		const cart = await CartModel.findByIdAndDelete(id);
// 		return cart ? cart.toObject() : null; // avoid error if cart is null
// 	}

// 	static hasProduct(cart, productId) {
// 		// If the cart does not exist, return false
// 		if (!cart) return false;

// 		// Check if the product exists in the cart
// 		return cart.products.some((item) => item.product._id.equals(productId));
// 	}
// }
