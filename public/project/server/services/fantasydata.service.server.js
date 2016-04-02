module.exports = function(app, https) {
    app.get("/api/project/getNews", getNews);
    app.post("/api/project/search/:player", searchSportsPlayer);

    var API = "api.fantasydata.net";

    function getNews(req, res) {
        var PATH = "/v2/JSON/News";

        var options = {
            method: 'GET',
            host: API,
            path: "/" + "NFL" + PATH,
            headers: {
                "Ocp-Apim-Subscription-Key": "f10779725e0a4d42a3928e0c3155f442"
            }
        };

        var request = https.request(options, function(response) {
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
        request.end();
    }

    function searchSportsPlayer(req, res) {
        var PATH_PLAYERS = "/v2/JSON/Players";

        var player = req.params.player;
        var sports = req.body;



        var options = {
            method: 'GET',
            host: API,
            path: "/" + sports.name + PATH_PLAYERS,
            headers: {
                "Ocp-Apim-Subscription-Key": sports.key
            }
        };

        var request = https.request(options, function(response) {
            var data = '';
            response.on('uncaughtException', function(err) {
                console.log(err);
            });
            response.on('data', function(chunk) {
                data += chunk;
            });
            response.on('end', function() {
                var dataToBeSent = JSON.parse(data);
                searchSportsPlayerById(dataToBeSent, sports, player, res);
            });
        });
        request.end();
    }

    function searchSportsPlayerById(data, sports, player, res) {
        var PATH_NEWS = "/v2/JSON/NewsByPlayerId/";
        var key = undefined;
        for(var t in data) {
            if((data[t].FirstName + data[t].LastName) == player) {
                key = data[t].PlayerID;
                break;
            }
        }

        options = {
            method: 'GET',
            host: API,
            path: "/" + sports.name + PATH_NEWS + key,
            headers: {
                "Ocp-Apim-Subscription-Key": sports.key
            }
        };

        request = https.request(options, function(response) {
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
        request.end();
    }

};
