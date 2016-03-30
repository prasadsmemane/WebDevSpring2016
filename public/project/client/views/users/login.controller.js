(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, UserService) {
        $scope.login = login;

        function login() {
            UserService.loginUserByCredentials($scope.user.username, $scope.user.password)
                .then(function(response) {
                    if(response.data !== "null") {
                        var user = response.data;
                        UserService.setCurrentUser(user);
                        if(isAdmin(user))
                            $location.url('/admin');
                        else
                            $location.url('/profile');
                    }
                    else {
                        $scope.errorMessage = "Invalid Credentials";
                    }
                });
        }

        function isAdmin(user) {
            if(angular.isUndefined(user))
                return false;
            return user.roles === "admin";
        }
    }
}());
