var async = require('async');
var request = require('request');
var moment = require('moment');
var CronJob = require('cron').CronJob;
const User = require('../../model/user_registration_model').UsersRegistration
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('../../db/connection');
var sendEmail =  require('./sending_email');
var sendSms = require('./sending_sms');


var todayDate = moment();
var current_date = todayDate.format("MMDDYYYY");
var todo_date = todayDate.add(7, 'days').format("MMDDYYYY");
var apiUrl_dates = `http://dev-api.msg.com/v2/dates?start_date=${current_date}&end_date=${todo_date}`;
var apiUrl_shows = `http://dev-api.msg.com/v2/shows?start_date=${current_date}&end_date=${todo_date}`;

new CronJob('*/10 * * * * *', function() {

	  console.log('You will see this message every 30 seconds');

   	User.find({},'email phonenumber',function(err, result){
	   	if(err){
	   		console.log(err)
	   	}else{
	   		var users_email = result.map(function(obj){ return obj.email });
			var users_phonenumber = result.map(function(obj){ return obj.phonenumber });
			console.log(users_email)
	   		//sendEmail.sendgridemail(users_email);
	   		//sendSms.twiliosms();
	   	}

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
		 	// console.log(property_to_send_url);
		 	// console.log(property_to_send_name);
  			}
		})

	   		//sendEmail.sendgridemail(users_email);
	   		sendSms.twiliosms();
   })
}, null, true, 'America/Los_Angeles');

