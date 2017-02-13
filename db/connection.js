var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test';

// Mongoose.connect(url); 
// var db = Mongoose.connection;
// db.on(‘error’, console.error.bind(console, ‘connection error’));
// db.once(‘open’, function callback() {
//   console.log(“Connection with database succeeded.”);
// });
// exports.db = db;

mongoose.connect(url);

var db_connection = mongoose.connection;
 
db_connection.on('error', function (err) {
  console.log('connection error', err);
});
db_connection.once('open', function () {
  console.log('connected.');
});

exports.db_connection = db_connection;