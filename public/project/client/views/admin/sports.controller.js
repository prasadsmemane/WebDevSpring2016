(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SportsController", SportsController)

    function SportsController($scope, $rootScope, SportsService) {
        var currentUser = $rootScope.currentUser;

        $scope.deleteSport = deleteSport;
        $scope.addSport = addSport;

        if(currentUser.role === "admin")
            viewAllSports();

        function viewAllSports() {
            SportsService.findAllSports()
                .then(function (response) {
                    console.log(response);
                    setSports(response);
                });
        }

        function deleteSport(index) {
            var sportId = $scope.sports[index]._id;
            SportsService.deleteSportById(sportId)
                .then(function(response) {
                    viewAllSports();
                });
        }

        function addSport() {
            SportsService.createNewSport($scope.newSport)
                .then(function(response) {
                    viewAllSports();
                });
        }

        function setSports(response) {
            $scope.newSport = {};
            $scope.sports = response.data;
        }
    }
}());

