/**
 * This file contains the model for the carts
 */

import mongoose from 'mongoose';

const { Schema } = mongoose; //import the Schema from mongoose

const collection = 'carts'; //name of the collection

const cartSchema = new Schema({
	id: { type: Number, required: true, unique: true },
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
				quantity: { type: Number, required: true, default: 1 },
				totalProduct: { type: Number, required: true, default: 0 },
			},
		],
		default: [],
	},
	totalCart: { type: Number, default: 0 },
});

// Mongoose Middleware: Populate the product field in the products array always before returning the cart usind find
// to show in the cart I only need to populate only some fields like title, price and thumbnail and not all fields of the product. To do this we use the second parameter of populate which is the field selection.
cartSchema.pre(['find', 'findOne'], function (next) {
	this.populate('products.product', '_id title price thumbnail');
	next();
});

const CartModel = mongoose.model(collection, cartSchema);

export default CartModel;
