(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("FantasyDataService", FantasyDataService);

    function FantasyDataService($http) {
        var api = {
            getAllNews: getAllNews,
            getAllNewsForUser: getAllNewsForUser,
            searchSportsPlayer: searchSportsPlayer
        };
        return api;

        function getAllNews() {
            return $http.get("/api/project/getAllNews");
        }

        function getAllNewsForUser(userId) {
            return $http.get("/api/project/" + userId + "/getAllNews");
        }

        function searchSportsPlayer(sports, player) {
            var playerNoSpaces = player.replace(/\s+/g, '');
            return $http.post("/api/project/search/" + playerNoSpaces, sports);
        }

    }

}());
