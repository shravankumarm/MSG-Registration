var twilio = require('twilio');
var accountSid = 'AC2c49c9a1a7749d40fead965e71b550a6'; // Your Account SID from www.twilio.com/console
var authToken = '{{ c8610286ef652f27c9751e8f49c69b11 }}';   // Your Auth Token from www.twilio.com/console
var client = new twilio.RestClient(accountSid, authToken);

module.exports = {
	twiliosms:function(){
		client.messages.create({
		    body: 'Hello from twilio',
		    to: '+19378182549',  // Text this number
		    from: '+16822371653' // From a valid Twilio number
		}, function(err, message) {
			if(err){
				console.log(err)
			}else{
		    console.log(success);
		    }
		});
	}
}