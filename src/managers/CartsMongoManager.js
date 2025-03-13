import CartModel from '../models/cart.model.js';

class CartsMongoManager {
	static async get() {
		return CartModel.find().lean();
	}

	static async create(product) {
		let newProduct = await CartModel.create(product);
		return newProduct.toObject();
	}

	static async getById(id) {
		const product = await CartModel.findOne({ id: id });
		return product ? product.toObject() : null; // avoid error if product is null
	}

	static async delete(id) {
		const product = await CartModel.findByIdAndDelete(id);
		return product ? product.toObject() : null; // avoid error if product is null
	}
}

export default CartsMongoManager;
