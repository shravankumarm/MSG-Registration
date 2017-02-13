var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_schema = new Schema({
		firstname: String,
    	lastname: String,
    	email: String,
    	phonenumebr: Number
});



module.exports.user_schema = user_schema;