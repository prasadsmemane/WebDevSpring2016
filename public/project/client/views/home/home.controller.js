(function () {
    "use strict";

    var NEWS_URL = "https://api.fantasydata.net/nfl/v2/JSON/News";

    angular
        .module("SportsBarApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, FantasyDataService) {

        init();
        function init() {
            FantasyDataService.getRecentNews(renderNews)
        }


        function renderNews(response) {
            $scope.recentNews = response;
        }
    }
}());
