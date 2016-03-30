(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("UsersController", UsersController)

    function UsersController($scope, $rootScope, UserService, $location) {
        var currentUser = $rootScope.currentUser;

        $scope.updateUserEmail = updateUserEmail;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.viewAllUsers = viewAllUsers;

        if(currentUser.role === "admin")
            viewAllUsers();

        function viewAllUsers() {
            UserService.findAllMembers()
                .then(function (response) {
                $scope.user = {};
                $scope.users = response.data;

            });
        }

        function updateUserEmail() {
            var selectedUser = $scope.selectedForm;
            var updateUser = $scope.user;

            if(angular.equals(selectedUser, updateUser)) {
                $scope.errorMessage = "Please don't use the same form title";
                return;
            }

            var updateEmail = updateUser.email;

            if(angular.isUndefined(updateEmail)|| updateEmail.trim() === "" || updateEmail === null) {
                $scope.errorMessage = "Please enter an email address";
                return;
            }

            UserService.updateUser(updateUser._id, updateUser)
                .then(function(response) {
                    $scope.message = "Email updated successfully";
                    viewAllUsers();
            });
        }

        function deleteUser(index) {
            var userId = $scope.users[index]._id;
            UserService.deleteUserById(userId).then(function(reponse) {
                viewAllUsers()
            });
        }

        function selectUser(index) {
            $scope.selectedUser = $scope.users[index];
            var changeEmail = {
                "_id" : $scope.users[index]._id,
                "firstName" : $scope.users[index].firstName,
                "lastName" : $scope.users[index].lastName,
                "username" : $scope.users[index].username,
                "password" : $scope.users[index].password,
                "email" : $scope.users[index].email,
                "sports" : $scope.users[index].sports,
                "role" : $scope.users[index].role
            };
            $scope.user = changeEmail;
        }

    }
}());
