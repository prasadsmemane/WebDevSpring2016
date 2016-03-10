(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        $scope.update = update;

        function update(){
            UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser, callback);
        }

        function callback(user) {
            UserService.setCurrentUser(user);
            $location.url('/profile');
        }

    }
}());
