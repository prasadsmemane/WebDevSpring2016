var express = require('express');
var cors = require('cors');
var https = require('https');
var multer = require('multer');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');
var session = require('express-session');

var mongoose = require('mongoose');
var public_folder = __dirname + '/public';
var app = express();

//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://localhost/webdev2016';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);


app.use(cors());
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.PASSPORT_SECRET || "My Secret",
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
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

var aUserModel = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
var pUserModel = require("./public/project/server/models/user.model.server.js")(db, mongoose);

require('./public/assignment/server/app.js')(app, db, mongoose, aUserModel, pUserModel, passport);
require('./public/project/server/app.js')(app, db, mongoose, aUserModel, pUserModel, passport);

app.listen(port, ipaddress);
