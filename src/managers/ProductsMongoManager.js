import ProductModel from '../models/product.model.js';

class ProductsMongoManager {
	static async get({ category, status, priceOrder, page = 1, limit = 10 }) {
		try {
			const filter = {};

			// Add filter by category
			if (category && category !== 'all') {
				filter.category = category;
			}

			// Add filter by availability status
			if (status && status !== 'all') {
				filter.availabilityStatus = status;
			}

			// Pagination options configuration
			const options = {
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				sort: {},
				lean: true, // To improve performance
			};

			// Apply price order if provided
			if (priceOrder === 'asc' || priceOrder === 'desc') {
				options.sort.price = priceOrder === 'asc' ? 1 : -1;
			}

			// Execute and returnthe query with pagination
			const result = await ProductModel.paginate(filter, options);

			// If there are no products, return an empty array
			if (result.docs.length === 0) {
				return { products: [], totalDocs: 0, totalPages: 0, currentPage: 1 };
			}

			return result;
		} catch (error) {
			console.error('Error fetching products:', error.message);
			return { products: [], totalDocs: 0, totalPages: 0, currentPage: 1 };
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
			// const product = await ProductModel.findOne({ id }).lean();
			const product = await ProductModel.findById(id).lean();
			return product || null; // Return null if not found
		} catch (error) {
			console.error('Error fetching product by ID:', error.message);
			return null;
		}
	}
	// Update a product's data
	static async updateById(id, product) {
		try {
			const updatedProduct = await ProductModel.findOneAndUpdate(
				{ _id: id }, // Search for _id
				{ $set: product }, // Update with new product data
				{ new: true, lean: true } // Returns the updated document as a flat object
			);
			return updatedProduct || null; // Return the updated or null product if you are not
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
