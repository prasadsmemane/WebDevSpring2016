(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SportsController", SportsController)

    function SportsController($rootScope, SportsService) {
        var vm = this;

        var currentUser = $rootScope.currentUser;

        vm.deleteSport = deleteSport;
        vm.addSport = addSport;

        if(currentUser.role === "admin")
            viewAllSports();

        function viewAllSports() {
            SportsService.findAllSports()
                .then(function (response) {
                    setSports(response);
                });
        }

        function deleteSport(sport) {
            var sportId = sport._id;
            SportsService.deleteSportById(sportId)
                .then(function(response) {
                    viewAllSports();
                });
        }

        function addSport(newSport) {
            SportsService.createNewSport(newSport)
                .then(function(response) {
                    viewAllSports();
                });
        }

        function setSports(response) {
            vm.newSport = {};
            vm.sports = response.data;
        }
    }
}());

