(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $route) {
        $scope.$route = $route;
        $scope.register = register;

        function register() {
            UserService.createUser($scope.user, callback)
        }

        function callback(user) {
            UserService.setCurrentUser(user);
            $location.url('/profile');
        }

    }
}());