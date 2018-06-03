'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var slotSchema = new Schema({
    by: String,
	status: {
		type: String,
		default: 'Requested'
	},
	when: {
		date: Date,
		time: String
	}
});

module.exports = mongoose.model('slotSchema', slotSchema);