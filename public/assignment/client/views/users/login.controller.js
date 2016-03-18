(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login() {

            UserService.loginUserByCredentials($scope.user.username, $scope.user.password)
                .then(function(res) {
                    if(res.data !== "null") {
                        $rootScope.currentUser = res.data;
                        $location.url("/profile");
                    }
                    else {
                        $scope.errorMessage = "Invalid Credentials";
                    }
                });
        }

        function isAdmin(user) {
            if(angular.isUndefined(user))
                return false;
            return user.roles.indexOf('admin') !== -1;
        }
    }
}());