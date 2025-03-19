/**
 * This file contains the model for the products
 * The model is the structure of the data that we will store in the database
 * The model is used to create the collections in the database
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import CartModel from './cart.model.js';

const { Schema } = mongoose; //import the Schema from mongoose

const collection = 'products'; //name of the collection

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

const productSchema = new Schema({
	id: { type: Number, required: true, unique: true },
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	category: {
		type: String,
		enum: categoryList, // Only accept values ​​on this list
		required: true,
	},
	price: { type: Number, required: true },
	rating: { type: Number, default: 4.5 },
	stock: { type: Number, required: true },
	code: { type: String, required: false, default: 'RCH45Q1A' },
	availabilityStatus: { type: String, default: 'In Stock' },
	thumbnail: { type: String, required: false },
});

productSchema.plugin(mongoosePaginate);

/**
 * Middleware that runs before deleting a product.
 * It is responsible for eliminating this product from all the carts in which it is present.
 */
productSchema.pre('findOneAndDelete', async function (next) {
	try {
		const productId = this.getQuery()._id; // Obtener el _id del producto que se está eliminando

		// Remove the product from all the carts where you are present
		await CartModel.updateMany(
			{ 'products.product': productId }, // Buscar carritos que contengan este producto
			{ $pull: { products: { product: productId } } } // Eliminar el producto de la lista
		);

		next();
	} catch (error) {
		next(error);
	}
});

const ProductModel = mongoose.model(collection, productSchema);

export default ProductModel;
