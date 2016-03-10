(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("SportsService", FormService);

    function FormService() {
        var sports = [
            {
                "_id": "000", "name": "Cricket"
            },
            {
                "_id": "010", "name": "Tennis"
            },
            {
                "_id": "020", "name": "FootBall"
            }
        ];

        var service = {
            createNewSport: createNewSport,
            findAllSports: findAllSports,
            deleteSportById: deleteSportById
        };

        return service;

        function createNewSport(sport, callback) {
            var newSport = {
                _id: new Date().getTime(),
                name: sport.name,
            };
            forms.push(newSport);
            callback();
        }

        function findAllSports(callback) {
            callback(sports);
        }

        function deleteSportById(sportId, callback) {
            for (var i = 0; i < sports.length; i++) {
                if (sports[i]._id == sportId) {
                    sports.splice(i, 1);
                    break;
                }
            }
            callback();
        }
    }
}());
