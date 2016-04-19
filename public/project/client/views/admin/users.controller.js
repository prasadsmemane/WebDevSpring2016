(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("UsersController", UsersController)

    function UsersController($scope, $rootScope, UserService) {
        var vm = this;

        vm.selectUser = null;
        vm.changeUser = null;
        vm.message = null;
        vm.errorMessage = null;

        var currentUser = $rootScope.currentUser;

        vm.updateUserEmail = updateUserEmail;
        vm.select = select;
        vm.deleteUser = deleteUser;
        vm.viewAllUsers = viewAllUsers;

        if(currentUser.role === "admin")
            viewAllUsers();

        function viewAllUsers() {
            UserService.findAllMembers()
                .then(function (response) {
                    vm.user = {};
                    vm.users = response.data;
                });
        }

        function updateUserEmail(user) {
            vm.message = null;
            vm.errorMessage = null;

            if(angular.equals(vm.changeUser.email, user.email)) {
                vm.errorMessage = "Please do not use the same email address";
                return;
            }

            UserService.updateUser(user._id, user)
                .then(function(response) {
                    vm.message = "Email updated successfully";
                    viewAllUsers();
                });
        }

        function deleteUser(user) {
            var userId = user._id;
            UserService.deleteUserById(userId).then(function(reponse) {
                viewAllUsers()
            });
        }

        function select(user) {
            vm.selectUser = angular.copy(user);
            vm.changeUser = angular.copy(user);
            delete vm.selectUser.password;
        }

    }
}());
