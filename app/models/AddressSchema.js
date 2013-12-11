var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var AddressSchema = new Schema({
	address1: String,
	address2: String,
	city: String,
	state: String,
	zipCode: String,
	country: String
});


mongoose.model('Address', AddressSchema);