var express = require('express');
var cors = require('cors')
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.options('*', cors());
app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://webdev2016-memaneprasad.rhcloud.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/index.html');
});

app.get('/project', function(req, res){
    res.sendfile('/project/index.html');
});