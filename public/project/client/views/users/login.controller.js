(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService.loginUserByCredentials(user.username, user.password)
                .then(function(response) {
                        var user = response.data;
                        UserService.setCurrentUser(user);
                        if (isAdmin(user))
                            $location.url('/admin');
                        else
                            $location.url('/profile');
                    },
                    function(err) {
                        $scope.errorMessage = "Invalid Credentials";
                    });
        }

        function isAdmin(user) {
            if(angular.isUndefined(user))
                return false;
            return user.roles === "admin";
        }
    }
}());
