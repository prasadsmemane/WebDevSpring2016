(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, callback);
        }

        function callback(user) {
            console.log(user);
            if (user !== null) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                console.log("Call back in login");
                if(isAdmin(user))
                    $location.url('/admin');
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