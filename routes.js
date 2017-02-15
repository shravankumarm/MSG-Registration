module.exports = function(app){
	var users_registration_controller = require('./controller/user_registration_controller');

	app.get('/',function(req,res){
		res.render('user_registration');
	});
	
	app.post('/userregistration',users_registration_controller.userregistration,function(req,res){
		if(req){

		}else{
			alert("registered");
		return res.redirect('/views/success_msg.jade');
		}
	})

 }