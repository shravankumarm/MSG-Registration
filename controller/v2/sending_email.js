module.exports = {
	sendgridemail:function(users_email,property_to_send_url){
		var users_list = ["shaanjonesb@gmail.com","ram132591@gmail.com"]
		var helper = require('sendgrid').mail;
  
		from_email = new helper.Email("shravankumarm1991@gmail.com");
		for(var i=0 ; i<=users_email.length ; i++){
			to_email = new helper.Email(users_email[i]);
			subject = "email has been sent from sendgrid";
			content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
			mail = new helper.Mail(from_email, subject, to_email, content);

			var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
			var request = sg.emptyRequest({
	  			method: 'POST',
	  			path: '/v3/mail/send',
	  			body: mail.toJSON()
			});

			sg.API(request, function(error, response) {
	  		console.log(response.statusCode);
	  		console.log(response.body);
	  		console.log(response.headers);
			})
		}	
	}
}