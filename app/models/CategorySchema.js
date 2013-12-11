var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var CategorySchema = new Schema({
	id: Schema.Types.ObjectId,
	parentID:{
		type: Schema.Types.ObjectId,
		ref:'CategorySchema'
	},
	name:String
});


mongoose.model('Category', CategorySchema);
