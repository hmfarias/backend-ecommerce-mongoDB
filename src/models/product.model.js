/**
 * This file contains the model for the products
 * The model is the structure of the data that we will store in the database
 * The model is used to create the collections in the database
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

const ProductModel = mongoose.model(collection, productSchema);

export default ProductModel;
