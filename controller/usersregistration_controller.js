const UserRegister = require('../model/usersregistration_model').UsersRegistration

module.exports = {
	index: function(req,res){
		res.render('views/usersregistration.jade');
	},

	// register_user: function(req,res){
	// 	var firstName = req.body.firstname,
	// 	var lastName = req.body.lastname,
	// 	var email = req.body.email,
	// 	var phoneNumber = req.body.phonenumebr
	// }

	

}