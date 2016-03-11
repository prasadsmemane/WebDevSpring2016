(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SportsController", SportsController)

    function SportsController($scope, $rootScope, SportsService, UserService) {
        var currentUser = $rootScope.currentUser;

        $scope.deleteSport = deleteSport;
        $scope.addSport = addSport;

        if(currentUser.role === "admin")
            viewAllSports();

        function viewAllSports() {
            SportsService.findAllSports(function (sports) {
                $scope.newSport = {};
                $scope.sports = sports;

            });
        }

        function deleteSport(index) {
            var sportId = $scope.sports[index]._id;
            SportsService.deleteSportById(sportId, function(users) {
                viewAllSports();
            });
        }

        function addSport() {
            SportsService.createNewSport($scope.newSport, function(sport) {
                viewAllSports();
            })
        }
    }
}());

