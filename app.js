var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var app =  express();
require('./db/connection');

    //configure view 
    app.set('view engine','jade');
    app.set('views', path.join(__dirname,'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

    require('./routes')(app);

    app.listen(3000,function(){
    	console.log('ready on port 3000');
    })

    module.exports = app;