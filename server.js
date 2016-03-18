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

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/client/index.html');
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

require('./public/assignment/server/app.js')(app);


//Connection configuration for local and openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
