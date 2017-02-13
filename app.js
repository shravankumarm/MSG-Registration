var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var app =  express();

var db = require('./db/connection');

//require('./routes');


    //configure view 
    app.set('view engine','jade');
    app.set('views', path.join(__dirname,'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());


    app.get('/',function(req,res){
    	res.render('usersregistration');
    });
  
var user_schema = mongoose.model('user_schema');
    app.post('/userregistration', function(req,res){
        var content = new user_schema(req.body.content);
        content.save(function(err){
            if(err){
                return handleError(err);
             } else {
            console.log('your form has been saved');
            }
        })
    });

    // app.post('/userregistration',function(req,res){
    // 	//console.log(req.body);
    // 	//res.end("email has been added");
    // 	// var register = {
    // 	// 	firstname: req.body.firstname,
    // 	// 	lastname: req.body.lastname,
    // 	// 	email: req.body.email,
    // 	// 	phonenumebr: req.body.phonenumber
    // 	// };
    // 	res.redirect('/');
    // });

    app.listen(3000,function(){
    	console.log('ready on port 3000');
    })

    module.exports = app;