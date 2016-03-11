(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, SportsService, $location, $rootScope) {
        $scope.register = register;
        $scope.toggleSelection = toggleSelection;

        $scope.selection = [];

        SportsService.findAllSports(function(sports) {
            $scope.sports = sports;
        });

        function toggleSelection(sportName) {
            var idx = $scope.selection.indexOf(sportName);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selection.push(sportName);
            }
        }

        function register() {
            $scope.user.sports = $scope.selection;
            console.log($scope.user.sports);
            UserService.createUser($scope.user, callback)
        }

        function callback(user) {
            UserService.setCurrentUser(user);
            $rootScope.currentUser = user;
            console.log("Inside Register: " + user.username + user.sports);
            $location.url('/profile');
        }

    }
}());
