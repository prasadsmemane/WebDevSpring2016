(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, SportsService, $location, $rootScope) {
        $scope.register = register;
        $scope.toggleSelection = toggleSelection;

        $scope.selection = [];

        SportsService.findAllSports()
            .then(function(response) {
            $scope.sports = response.data;
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
            var user = $scope.user;
            if(angular.isUndefined(user) || !user.username){
                $scope.errorMessage = "Please provide a username";
                return;
            }
            if(!user.password || !user.verifypassword){
                $scope.errorMessage = "Please provide a password";
                return;
            }
            if(user.password !== user.verifypassword){
                $scope.errorMessage = "Passwords must match";
                return;
            }
            if(!user.email){
                $scope.errorMessage = "Please provide an email";
                return;
            }

            if($scope.user.sports.length === 0) {
                $scope.errorMessage = "Please select at least one favourite sports";
                return;
            }

            $scope.user.sports = $scope.selection;

            UserService.createUser(user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    $location.url('/profile');
                })
        }

    }
}());
