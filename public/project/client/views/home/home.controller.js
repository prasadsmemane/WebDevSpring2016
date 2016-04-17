(function () {
    "use strict";

    angular
        .module("SportsBarApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, FantasyDataService, $rootScope) {

        init();
        function init() {

            if($rootScope.currentUser == undefined) {
                FantasyDataService.getAllNews()
                    .success(function (response) {
                        var recentNews = [];
                        for (var i in response) {
                            recentNews = recentNews.concat(response[i]);
                        }
                        $scope.recentNews = recentNews;
                    });
            }
        }

    }
}());
