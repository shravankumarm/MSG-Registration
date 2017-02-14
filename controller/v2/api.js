var request = require('request');
var moment = require('moment');
var CronJob = require('cron').CronJob;
const User = require('../../model/user_registration_model').UsersRegistration
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('../../db/connection');


var current_date = moment(Date.now()).format('MMDDYYYY') ;
// var todo_date = current_date.clone().add(1,'week').format('MM/DD/YYYY');
// console.log(todo_date);

var apiUrl_dates = `http://dev-api.msg.com/v2/dates?start_date=${current_date}&end_date=02202017`;
var apiUrl_shows = `http://dev-api.msg.com/v2/shows?start_date=${current_date}&end_date=02202017`;
console.log(apiUrl_shows);

request(apiUrl_shows, function(error, response) {
  if (!error && response.statusCode == 200) {
  	// for dates api

  	// var body = response.body;
  	// var individual_key = JSON.parse(body);
  	// var result_key = individual_key.data.result;
 	// var flow_selector = result_key['1-8'];
 	// var getting_param = flow_selector[0];
 	// var property_to_send = getting_param.date
 	// console.log(property_to_send);

 	//for shows api

 	var body = response.body;
    var individual_key = JSON.parse(body);
    var result_key = individual_key.data.results[0];
 	var flow_selector = result_key['1-8'];
 	var property_to_send_url = result_key.host_url;
 	var property_to_send_name = result_key.name;
 	console.log(property_to_send_url);
 	console.log(property_to_send_name);


  }
})

new CronJob('*/30 * * * * *', function() {
  console.log('You will see this message every second');
   User.find({},'email phonenumber',function(err, result){
   		//console.log(result[email]);
	   	if(err){
	   		console.log(err)
	   	}else{

	   		var users_email = result.map(function(obj){ return obj.email });
			var users_phonenumber = result.map(function(obj){ return obj.phonenumber });
			console.log(users_email)
	   		sendgridemail(users_email);
	   	}
   })
}, null, true, 'America/Los_Angeles');


// function sendgridemail(users_email){
// var users_list = ["shaanjonesb@gmail.com","ram132591@gmail.com"]
// var helper = require('sendgrid').mail;
  
// from_email = new helper.Email("shravankumarm1991@gmail.com");
// to_email = new helper.Email(users_email);
// subject = "email has been sent from sendgrid";
// content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
// mail = new helper.Mail(from_email, subject, to_email, content);

// var sg = require('sendgrid')('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');
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON()
// });

// sg.API(request, function(error, response) {
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// })
// }

function sendgridemail(){
var sg = require('sendgrid')('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');
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: ['shaanjonesb@gmail.com','ram132591@gmail.com'],
          },
        ],
        subject: 'Hello World from the SendGrid Node.js Library!',
      },
    ],
    from: {
      email: 'shravankumarm1991@gmail.com',
    },
    content: [
      {
        type: 'text/plain',
        value: 'Hello, Email!',
      },
    ],
  },
});

//With promise
sg.API(request)
  .then(response => {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  })
  .catch(error => {
    //error is an instance of SendGridError
    //The full response is attached to error.response
    console.log(error.response.statusCode);
  });

//With callback
sg.API(request, function(error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
}
