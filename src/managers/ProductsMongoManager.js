import ProductModel from '../models/product.model.js';

class ProductsMongoManager {
	// Retrieve all products (returns a lean object for performance)
	static async get() {
		try {
			return await ProductModel.find().lean();
		} catch (error) {
			console.error('Error fetching products:', error.message);
			return [];
		}
	}

	// Create a new product and return it as a plain object
	static async create(product) {
		try {
			const newProduct = await ProductModel.create(product);
			return newProduct.toObject();
		} catch (error) {
			console.error('Error creating product:', error.message);
			return null;
		}
	}

	// Retrieve a single product by its custom 'id' field
	static async getById(id) {
		try {
			const product = await ProductModel.findOne({ id }).lean();
			return product || null; // Return null if not found
		} catch (error) {
			console.error('Error fetching product by ID:', error.message);
			return null;
		}
	}

	// Update a product's data
	static async update(product) {
		try {
			const updatedProduct = await ProductModel.findOneAndUpdate(
				{ id: product.id }, // Find by custom 'id' field
				{ $set: product }, // Update with the new product data
				{ new: true, lean: true } // Return updated document as plain object
			);
			return updatedProduct || null; // Return null if not found
		} catch (error) {
			console.error('Error updating product:', error.message);
			return null;
		}
	}

	// Delete a product by _id
	static async delete(id) {
		try {
			const product = await ProductModel.findByIdAndDelete(id);
			return product ? product.toObject() : null; // avoid error if product is null
		} catch (error) {
			console.error('Error deleting product:', error.message);
			return null;
		}
	}
}

export default ProductsMongoManager;

// static async get() {
// 	return ProductModel.find().lean();
// }

// static async create(product) {
// 	let newProduct = await ProductModel.create(product);
// 	return newProduct.toObject();
// }

// static async getById(id) {
// 	const product = await ProductModel.findOne({ id: id });
// 	return product ? product.toObject() : null; // avoid error if product is null
// }

// static async delete(id) {
// 	const product = await ProductModel.findByIdAndDelete(id);
// 	return product ? product.toObject() : null; // avoid error if product is null
// }
