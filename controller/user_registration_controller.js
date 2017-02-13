const UserRegister = require('../model/user_registration_model').UsersRegistration

module.exports = {
	userregistration: function(req,res){
		var User = new UserRegister();
		User.firstname = req.body.firstname,
		User.lastname = req.body.lastname,
		User.email = req.body.email,
		User.phonenumber = req.body.phonenumber

		return User.save().then(function(users){
			console.log("saved to mongodb");
		},function(err){
			console.log("error")
		});

	}	
}