(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $rootScope) {
        $scope.register = register;

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