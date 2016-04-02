(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("FantasyDataService", FantasyDataService);

    function FantasyDataService($http) {
        var api = {
            getRecentNews: getRecentNews,
            searchSportsPlayer: searchSportsPlayer
        };
        return api;

        function getRecentNews() {
            return $http.get("/api/project/getNews");
        }

        function searchSportsPlayer(sports, player) {
            var playerNoSpaces = player.replace(/\s+/g, '');
            return $http.post("/api/project/search/" + playerNoSpaces, sports);
        }

    }

}());
