import CounterModel from '../models/counter.model.js';

/**
 * Increase the counter whose name is received in the counterName parameter - within a transaction
 * The counter is stored in the database in a collection called counters.
 * Each counter has a name and a value. The name is the name of the counter and the value is the current value of the counter.
 * The counter is incremented by 1 every time a new document is created
 * @param {mongoose.ClientSession} session
 * @param {string} counterName
 * @returns {Promise<number>} Next counter value
 */
export const incrementCounter = async (session, counterName) => {
	const counter = await CounterModel.findOneAndUpdate(
		{ _id: counterName },
		{ $inc: { value: 1 } },
		{ upsert: true, new: true, session }
	);
	return counter.value;
};
