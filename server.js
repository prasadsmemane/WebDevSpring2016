var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/hello', function(req, res){
    res.send('Hello World');
});


//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);