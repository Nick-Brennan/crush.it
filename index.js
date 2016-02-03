//express config
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var views = path.join(process.cwd(), "views"); 

//middleware config
app.set('port', process.env.PORT || 3000);

app.use('/static', express.static('public'));
app.use('/vendor', express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.get('/', function(req, res){
	res.sendFile(views + "/home.html");
});

app.listen(app.get('port'), function(){
	console.log('Crush is Keyaling on port' + app.get('port'));
});