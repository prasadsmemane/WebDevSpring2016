(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("FantasyDataService", FantasyDataService);

    function FantasyDataService($http) {
        var api = {
            getRecentNews: getRecentNews
        };
        return api;

        function getRecentNews(callback) {
            $http.get("/getNews").success(function(response) {
                callback(response);
            });
            callback(null);
        }

    }

}());
