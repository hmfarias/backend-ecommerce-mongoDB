import CartModel from '../models/cart.model.js';

class CartsMongoManager {
	static async get() {
		return CartModel.find().lean();
	}

	static async create(cart) {
		let newCart = await CartModel.create(cart);
		return newCart.toObject();
	}

	static async update(cart) {
		const updatedCart = await CartModel.findOneAndUpdate(
			{ id: cart.id }, //find for the product with the specified id
			{ $set: { products: cart.products, totalCart: cart.totalCart } }, // Update only these fields
			{ new: true } // Retorna el documento actualizado
		);
		return updatedCart ? updatedCart.toObject() : null;
	}

	static async getById(id) {
		const cart = await CartModel.findOne({ id: id });
		return cart ? cart.toObject() : null; // avoid error if cart is null
	}

	static async delete(id) {
		const cart = await CartModel.findByIdAndDelete(id);
		return cart ? cart.toObject() : null; // avoid error if cart is null
	}

	static hasProduct(cart, productId) {
		// If the cart does not exist, return false
		if (!cart) return false;

		// Check if the product exists in the cart
		return cart.products.some((item) => item.product._id.equals(productId));
	}
}

export default CartsMongoManager;
