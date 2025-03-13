import CounterModel from '../models/counter.model.js';

class CountersMongoManager {
	static async incrementCounter(counterName) {
		const counter = await CounterModel.findOneAndUpdate(
			{ _id: counterName },
			{ $inc: { value: 1 } },
			{ upsert: true, new: true }
		);
		return counter.value;
	}
}

export default CountersMongoManager;
