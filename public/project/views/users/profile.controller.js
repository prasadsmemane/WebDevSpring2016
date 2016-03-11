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

        SportsService.findAllSports(function(sports) {
            $scope.sports = sports;
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
            UserService.updateUser(currentUser._id, currentUser, callback);
        }

        function callback(user) {
            UserService.setCurrentUser(user);
            $location.url('/profile');
        }

    }
}());
