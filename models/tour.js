var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	age: Number,
	gender: String,
	timestamp: {type: Date, default: Date.now},
	tour: [
		{lat: Number, lng: Number}
		],
	locationTag: {
		lat: Number,
		lng: Number
	}
});

module.exports = mongoose.model('tour', schema);