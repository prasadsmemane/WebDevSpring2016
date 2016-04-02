var express = require('express');
var cors = require('cors');
var https = require('https');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');
var public_folder = __dirname + '/public';
var app = express();

app.use(cors());
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(public_folder));

app.options('*', cors());

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/assignment/client', cors(), function(req, res){
    res.sendfile('/assignment/client/index.html');
});

app.get('/project', cors(), function(req, res){
    res.sendfile('/project/client/index.html');
});

require('./public/assignment/server/app.js')(app);
require('./public/project/server/app.js')(app);


//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
