/**
 * This file contains the model for the carts

 */

import mongoose from 'mongoose';

const { Schema } = mongoose; //import the Schema from mongoose

const collection = 'carts'; //name of the collection

const cartSchema = new Schema({
	id: { type: Number, required: true, unique: true },
	products: { type: String, required: true, unique: true },
});

const CartModel = mongoose.model(collection, cartSchema);

export default CartModel;
