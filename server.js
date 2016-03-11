var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.options('*', cors());

app.get('/hello', function(req, res){
    res.send('Hello World');
});

//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/index.html');
});

app.get('/project', cors(), function(req, res){
    res.sendfile('/project/index.html');
});
