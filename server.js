
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 
require('./config/passport')(passport); 

app.configure(function() {
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport	
	app.use(express.session({
 		 secret: 'work hard',
  		  resave: true,
  saveUninitialized: false
})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});


require('./app/routes.js')(app, passport); 
app.listen(port);
console.log('The magic happens on port ' + port);
