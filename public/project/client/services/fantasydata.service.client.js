(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("FantasyDataService", FantasyDataService);

    function FantasyDataService($http) {
        var api = {
            getAllNews: getAllNews,
            getRecentNews: getRecentNews,
            searchSportsPlayer: searchSportsPlayer
        };
        return api;

        function getAllNews() {
            return $http.get("/api/project/getAllNews");
        }

        function getRecentNews() {
            return $http.get("/api/project/NFL/getNews");
        }

        function searchSportsPlayer(sports, player) {
            var playerNoSpaces = player.replace(/\s+/g, '');
            return $http.post("/api/project/search/" + playerNoSpaces, sports);
        }

    }

}());
