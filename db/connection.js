require('../model/user_registration_model');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

var db_connection = mongoose.connection;
 
db_connection.on('error', function (err) {
  console.log('connection error', err);
});
db_connection.once('open', function () {
  console.log('connected.');
});
exports.db_connection = db_connection;