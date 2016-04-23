(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService.loginUserByCredentials(user.username, user.password)
                .then(function(response) {
                    if(response.data !== "null") {
                        UserService.setCurrentUser(response.data);
                        if(isAdmin(response.data))
                            $location.url("/admin");
                        else
                            $location.url("/profile");
                    }
                    else {
                        vm.errorMessage = "Invalid Credentials";
                    }
                });
        }

        function isAdmin(user) {
            if(angular.isUndefined(user))
                return false;
            return user.roles.indexOf('admin') > -1;
        }
    }
}());