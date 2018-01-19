const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');
const express = require('express');

// App
const app = express();

// Middlewares
app.use(cookieParser());

// Route
app.get('/', function(req, res) {

	// Cookies
	var c = req.cookies,
	msg = '[Set Cookie] "ac-mean-debug-try" : "someval"';

	// Send Cookie
	if (typeof c['ac-mean-debug-try'] === 'undefined') {
		var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
		res.cookie('ac-mean-debug-try', 'someval', {
			secure: true,
			httpOnly: false,
			expires: expiryDate
		});
	}
	else msg = '[Get Cookie] "ac-mean-debug-try" : ' + c['ac-mean-debug-try'];

	// Response
	res.send(msg);
});

// SSL
var key = fs.readFileSync('ssl/ssl/nginx.key');
var cert = fs.readFileSync('ssl/ssl/nginx.crt');
var options = {
	key: key,
	cert: cert
};

// HTTP
http.createServer(app).listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

// HTTPS
https.createServer(options, app).listen(3001, function() {
	console.log('Example app listening on port 3001 with SSL!');
});