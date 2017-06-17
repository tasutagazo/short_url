var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
	long_url: String,
	shortCode: {
		type: String,
		unique: true
	}
})

// I create an index here so it's faster to search by shortCode
urlSchema.index({ shortCode: 1 });
 
// Now, I create the model:
var UrlEntry = mongoose.model('Url', urlSchema);
module.exports = UrlEntry