var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var paymentType = ['credit card', 'cash'];

exports.Listing = new Schema({
	id: Number,
	name: {
		type: String, 
		trim: true,
		required: true
	},
	phone: String,
	altPhone: String,
	mobile: String,
	fax: String,
	webUrl: {
		type: String,
		trim: true
	},
	hours: String,
	payment:{
		type: String,
		enum: paymentType,
		default: paymentType[0]
	},
	description:{
		type: String,
		trim: true
	},
	images:[{
		url: String,
		text: String
	}],
	latitude: Number,
	longitude: Number,
	location:{
		address1: String,
		address2: String,
		city: String,
		state: String,
		zipCode: String,
		country: String
	},
	createdAt: {
		type: Date, 
		default: Date.now
	}
});



exports.Category = new Schema({
	id: Schema.Types.ObjectId,
	parentID:{
		type: Schema.Types.ObjectId,
		ref:'CategorySchema'
	},
	name:String
});




