(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, callback);
        }

        function callback(user) {
            if (user !== null) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                if(isAdmin(user))
                    $location.url('/admin');
                else
                    $location.url('/profile');
            }
        }

        function isAdmin(user) {
            if(angular.isUndefined(user))
                return false;
            return user.roles.indexOf('admin') !== -1;
        }
    }
}());
