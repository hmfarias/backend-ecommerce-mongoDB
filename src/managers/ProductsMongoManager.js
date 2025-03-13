import ProductModel from '../models/product.model.js';

class ProductsMongoManager {
	static async get() {
		return ProductModel.find().lean();
	}

	static async create(product) {
		let newProduct = await ProductModel.create(product);
		return newProduct.toObject();
	}

	static async getById(id) {
		const product = await ProductModel.findOne({ id: id });
		return product ? product.toObject() : null; // avoid error if product is null
	}

	static async delete(id) {
		const product = await ProductModel.findByIdAndDelete(id);
		return product ? product.toObject() : null; // avoid error if product is null
	}
}

export default ProductsMongoManager;
