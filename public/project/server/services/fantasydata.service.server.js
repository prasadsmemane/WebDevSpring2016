var async = require('async');

module.exports = function(app, userModel, sportsModel, https) {
    app.get("/api/project/:sports/getNews", getSportsNews);
    app.get("/api/project/getAllNews", getAllNews);
    app.post("/api/project/search/:player", searchSportsPlayer);
    app.get("/api/project/:userId/getAllNews", getAllNewsForUser);

    var API = "api.fantasydata.net";

    function getAllNews(req, res) {
        sportsModel.findAllSports()
            .then(
                function (doc) {
                    getNewsFromCol(doc, res);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllNewsForUser(req, res) {
        var userId = req.params.userId;

        userModel.findSportsForUser(userId)
            .then(
                function(doc) {
                    sportsModel.findSportsByName(doc)
                        .then(
                            function(doc) {
                                getNewsFromCol(doc, res);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getNewsFromCol(sports, res) {
        async.map(sports, function(item, callback) {
            var PATH = "/v2/JSON/News";

            var options = {
                method: 'GET',
                host: API,
                path: "/" + item.name + PATH,
                headers: {
                    "Ocp-Apim-Subscription-Key": item.key
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
                    callback(null, dataToBeSent);
                });
            });
            request.end();
        }, function(err, result) {
            if (err) {
                console.error(err.message);
            }
            res.send(result);
        })

    }

    function getSportsNews(req, res) {
        var sportsName = req.params.sports;

        sportsModel.findSportsByName(sportsName)
            .then(
            function(doc) {
                getNews(doc[0], res);
            },
            function(err) {
                res.status(400).send(err);
            }
        );


    }

    function getNews(sports, res) {
        var PATH = "/v2/JSON/News";

        var options = {
            method: 'GET',
            host: API,
            path: "/" + sports.name + PATH,
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
