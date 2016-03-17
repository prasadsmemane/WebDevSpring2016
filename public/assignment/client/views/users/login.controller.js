(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService, $http) {
        $scope.login = login;

        function login() {
            var credentials = {
                username: $scope.user.username,
                password: $scope.user.password
            }
            $http.post("/api/assignment/login", credentials)
                .then(function(res) {
                    if(res.data) {
                        $rootScope.currentUser = res.data;
                        $location.url("/profile");
                    }
                    else {
                        $scope.errorMessage = "Invalid Credentials";
                    }
                });
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