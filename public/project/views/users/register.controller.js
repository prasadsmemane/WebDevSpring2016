(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, SportsService, $location, $rootScope) {
        $scope.register = register;

        SportsService.findAllSports(function(sports) {
            $scope.sports = sports;
        })

        function register() {
            UserService.createUser($scope.user, callback)
        }

        function callback(user) {
            UserService.setCurrentUser(user);
            console.log("HERE");
            $rootScope.currentUser = user;
            $location.url('/profile');
        }

    }
}());
