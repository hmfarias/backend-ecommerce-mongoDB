/**
 * This file contains the model for the counter id of the products

 */

import mongoose from 'mongoose';

const { Schema } = mongoose; //import the Schema from mongoose

const collection = 'counters'; //name of the collection

const counterSchema = new Schema({
	_id: { type: String, required: true },
	value: { type: Number, default: 0 },
});

const CounterModel = mongoose.model(collection, counterSchema);

export default CounterModel;
