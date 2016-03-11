(function () {
    "use strict";

    var NEWS_URL = "https://api.fantasydata.net/nfl/v2/JSON/News";

    angular
        .module("SportsBarApp")
        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
        })
        .controller("HomeController", HomeController)

    function HomeController($scope, $http) {
        $scope.getRecentNews = getRecentNews;

        getRecentNews();

        function getRecentNews() {
            console.log("In API Call function");

            $http({method: 'GET',
                url: NEWS_URL,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "POST, GET, HEAD, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                    "Ocp-Apim-Subscription-Key": "f10779725e0a4d42a3928e0c3155f442"
                }
            }).success(renderNews);
        }

        function renderNews(response) {
            $scope.recentNews = response;
        }

    }
}());
