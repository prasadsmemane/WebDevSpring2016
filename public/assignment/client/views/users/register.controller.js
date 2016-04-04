(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $rootScope) {
        $scope.register = register;

        function register() {
            var user = $scope.user;
            if(!user.username){
                $scope.errorMessage = "Please provide a username";
                return;
            }
            if(!user.password || !user.verifypassword){
                $scope.errorMessage = "Please provide a password";
                return;
            }
            if(user.password !== user.verifypassword){
                $scope.errorMessage = "Passwords must match";
                return;
            }
            if(!user.email){
                $scope.errorMessage = "Please provide an email";
                return;
            }

            var emails = [];
            emails.push(user.email);
            user.emails = emails;

            UserService.createUser(user)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                })
        }

    }
}());