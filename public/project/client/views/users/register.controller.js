(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, SportsService, $location, $rootScope) {
        var vm = this;
        vm.errorMessage = null;
        vm.selection = [];

        vm.register = register;
        vm.toggleSelection = toggleSelection;

        SportsService.findAllSports()
            .then(function(response) {
                vm.sports = response.data;
            });

        function toggleSelection(sportName) {
            var idx = vm.selection.indexOf(sportName);

            // is currently selected
            if (idx > -1) {
                vm.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selection.push(sportName);
            }
        }

        function register(user) {
            if(angular.isUndefined(user) || !user.username){
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

            if(vm.selection.length === 0) {
                vm.errorMessage = "Please select at least one favourite sports";
                return;
            }

            user.sports = vm.selection;
            if(user.username != "admin")
                user.role = "member";
            else
                user.role = "admin";

            UserService.registerUser(user)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url('/profile');
                })
        }

    }
}());
