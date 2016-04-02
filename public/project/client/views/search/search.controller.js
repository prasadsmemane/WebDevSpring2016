(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SearchController", SearchController)

    function SearchController($scope, SportsService, FantasyDataService) {
        $scope.search = search;
        init();

        function init() {
            SportsService.findAllSports()
                .then(function(response) {
                    $scope.selectedSports = response.data[0];
                    $scope.sports = response.data;
                });
        }

        function search(sport, player) {
            FantasyDataService.searchSportsPlayer(sport, player)
                .then(function(response) {
                   $scope.sportsTeamNews = response.data;
                });
        }

    }
}());