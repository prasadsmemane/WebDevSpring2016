(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, SportsService, $location, $rootScope) {
        var currentUser = $rootScope.currentUser;

        $scope.update = update;
        $scope.checkCurrentUserSports = checkCurrentUserSports;
        $scope.toggleSelection = toggleSelection;
        $scope.selection = [];

        SportsService.findAllSports().then(function(response) {
            $scope.sports = response.data;
            for (var sport in currentUser.sports) {
                $scope.selection.push(currentUser.sports[sport]);
            }
        });

        function checkCurrentUserSports(sportName) {
            var selected = $scope.selection;
            for(var sport in selected) {
                if(sportName === selected[sport])
                    return true;
            }
            return false;
        }

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
            console.log($scope.selection);
        }

        function update(){
            $rootScope.currentUser.sports = $scope.selection;
            currentUser = $rootScope.currentUser;

            if(angular.isUndefined(currentUser) || !currentUser.username){
                $scope.errorMessage = "Please provide a username";
                return;
            }
            if(!currentUser.password){
                $scope.errorMessage = "Please provide a password";
                return;
            }

            if(!currentUser.email){
                $scope.errorMessage = "Please provide an email";
                return;
            }

            if(currentUser.sports.length === 0) {
                $scope.errorMessage = "Please select at least one favourite sports";
                return;
            }

            UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $scope.message = "Profile Successfully Updated";
                    $location.url('/profile');
                });
        }

    }
}());
