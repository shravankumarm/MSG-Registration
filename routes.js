module.exports = function(){
	var users_registration_controller = require('./controller/usersregistration-controller');

	app.get('/',function(req,res){
		res.render('usersregistration');
	});

	// app.get('/views',users_registration_controller.index)
// 	app.post('/register_user',function(req, res) {}

 }