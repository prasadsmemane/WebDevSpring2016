(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(!user.username){
                vm.errorMessage = "Please provide a username";
                return;
            }
            if(!user.password || !user.verifypassword){
                vm.errorMessage = "Please provide a password";
                return;
            }
            if(user.password !== user.verifypassword){
                vm.errorMessage = "Passwords must match";
                return;
            }
            if(!user.email){
                vm.errorMessage = "Please provide an email";
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