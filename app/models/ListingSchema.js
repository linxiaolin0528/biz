
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var paymentType = ['credit card', 'cash'];

var ListingSchema = new Schema({
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
	createdAt: {
		type: Date, 
		default: Date.now
	}
});

mongoose.model('Listing', ListingSchema);