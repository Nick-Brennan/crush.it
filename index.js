//express config
var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var views = path.join(process.cwd(), "views");
var db = require('./models'); 

//middleware config
app.set('port', process.env.PORT || 3000);

app.use('/static', express.static('public'));
app.use('/vendor', express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'mind boggling session key'}));

//passport setup
passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username: username}, function(err, user){
		if(err) return done(err);
		if(!user) return done(null, false, {message: "Wrong Username"});

		user.comparePassword(password, function(err, isMatch){
			if(isMatch){
				return done(null, user);
			}else{
				return done(null, false, {message: "Wrong Password"});
			}
		});
	});
}));

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findByID(id, function(err, user){
		done(err, user);
	});
});

app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', function(req, res){
	res.render('index', {
		title: 'Express',
		user: req.user
	});
});

app.get('/login', function(req, res){
	res.render('login', {
		user: req.user
	})
});
//initialize server
app.listen(app.get('port'), function(){
	console.log('Crush is Keyaling on port' + app.get('port'));
});