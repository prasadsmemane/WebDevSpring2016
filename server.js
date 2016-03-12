var express = require('express');
var cors = require('cors');
var https = require('https');
var app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.options('*', cors());

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/index.html');
});

app.get('/project', cors(), function(req, res){
    res.sendfile('/project/index.html');
});

app.get('/getNews', getNews);

function getNews(req, res) {
    var options = {
        method: 'GET',
        host: "api.fantasydata.net",
        path: "/nfl/v2/JSON/News",
        headers: {
            "Ocp-Apim-Subscription-Key": "f10779725e0a4d42a3928e0c3155f442"
        }
    }

    var req = https.request(options, function(response) {
        var data = '';
        response.on('uncaughtException', function(err) {
            console.log(err);
        });
        response.on('data', function(chunk) {
            data += chunk;
        });
        response.on('end', function() {
            var dataToBeSent = JSON.parse(data);
            // send the data back to the angular service
            res.send(dataToBeSent);
        });
    });
    req.end();
}




//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
