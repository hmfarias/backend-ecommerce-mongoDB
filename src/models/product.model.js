/**
 * This file contains the model for the products
 * The model is the structure of the data that we will store in the database
 * The model is used to create the collections in the database
 */

import mongoose from 'mongoose';

const { Schema } = mongoose; //import the Schema from mongoose

const collection = 'products'; //name of the collection

const productSchema = new Schema({
	id: { type: Number, required: true, unique: true },
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
	code: { type: String, required: false },
	status: { type: Boolean, default: true },
	thumbnail: { type: String, required: false },
});

const ProductModel = mongoose.model(collection, productSchema);

export default ProductModel;
