var got = require('got');
var moment = require('moment');
//moment().format();

var loopSeconds = 120; 
var current_date = moment(Date.now()).format('MM/DD/YYYY') ;
console.log(current_date);
// var todo_date = current_date.clone().add(1,'week').format('MM/DD/YYYY');
// console.log(todo_date);

// var current_date = new Date();
// var dd = current_date.getDate();
// var mm = current_date.getMonth()+1; 
// var yyyy = current_date.getFullYear();

// if(dd<10) {
//     dd='0'+dd
// } 

// if(mm<10) {
//     mm='0'+mm
// } 

// current_date = mm+dd+yyyy;

// Date.prototype.addDays = function(days) {
//     this.setDate(this.getDate() + parseInt(days));
//     return this;
// };

// var todo_date = current_date.addDays(7)
// console.log(current_date)
// console.log(todo_date)

var apiUrl = `http://dev-api.msg.com/v2/dates?start_date=${current_date}&end_date=02202017`;

function loop(){
	got(apiUrl)
	    .then(response => {
	    	console.log("inside response");
	        console.log(response.body);
	        //=> '<!doctype html> ...' 
	    })
	    .catch(error => {
	        console.log(error.response.body);
	        //=> 'Internal server error ...' 
	    });
	    setTimeout(loop, loopSeconds * 1000);
}

loop();