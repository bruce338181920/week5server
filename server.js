
// import the various modules  
var express = require('express'); // used for general server functionality - app.get, res, req
var https = require('https'); // used to create https services 
var fs = require('fs');   // fs = file system, to access files on the server


var app = express();  // start a NodeJS express app

// serve static files - e.g. html, css
app.use(express.static(__dirname));

// read in the security files required for SSL 
// note that the certificates are held in a totally separate location for security
var privateKey = fs.readFileSync('/home/studentuser/certs/client-key.pem').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/client-cert.pem').toString(); 

// set up the authentication system for the https server
var credentials = {key: privateKey, cert: certificate};

// create an https server using these credentials and the express app
var httpsServer = https.createServer(credentials, app);

// tell the server what port to use to listen for messages from clients
httpsServer.listen(4443);

// set up some code to actually process requests from the client
// the /  indicates what happens when the user types in https://developer.cege.ucl.ac.uk:31060/
app.get('/', function (req, res) {
	// run some server-side code here - e.g. connect to a database and get data
  
	// console.log types information out to the terminal window (server)
	console.log('the https server has received a request'); 
	
	// res.send sends text out to the browser (client)
	res.send('Hello World - this is an https server');
});