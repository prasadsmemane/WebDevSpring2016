(function () {
    "use strict";

    angular
        .module("SportsBarApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, FantasyDataService) {

        init();
        function init() {
            FantasyDataService.getRecentNews()
                .success(function(response) {
                    $scope.recentNews = response;
            });
        }

    }
}());
