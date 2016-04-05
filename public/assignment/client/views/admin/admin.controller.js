(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, $rootScope, UserService) {
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;

        $scope.deleteUser = deleteUser;
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        if(currentUser.role == 'admin')
            viewAllUsersButCurrent();

        function viewAllUsersButCurrent() {
            UserService.findAllUsers()
                .then(function(response) {
                    var users = response.data;
                    for(var user in users) {
                        if(users[user]._id === userId)
                            users.splice(user, 1);
                    }
                    $scope.users = users;
            })
        }

        function deleteUser(index) {
            var userId = $scope.users[index]._id;

            UserService.deleteUserById(userId)
                .then(function(response) {
                    viewAllUsersButCurrent();
                });
        }

        function addUser() {
            var user = $scope.user;

            if(angular.isUndefined(user.username)|| user.username.trim() === "" || user.username === null) {
                $scope.errorMessage = "Please enter a username";
                return;
            }

            if(angular.isUndefined(user.password)|| user.password.trim() === "" || user.password === null) {
                $scope.errorMessage = "Please enter a password";
                return;
            }

            if(angular.isUndefined(user.role)|| user.role.trim() === "" || user.role === null) {
                $scope.errorMessage = "Please enter a role";
                return;
            }

            user.phones = [];
            user.emails = [];

            UserService.createUser(user)
                .then(function(response) {
                    viewAllUsersButCurrent();
                })
        }

        function selectUser(index) {
            $scope.selectedUser = $scope.users[index];

            var changeUser = {
                "_id" : $scope.users[index]._id,
                "username" : $scope.users[index].username,
                "password" : $scope.users[index].password,
                "role" : $scope.users[index].role,
                "phones" : $scope.users[index].phones,
                "emails" : $scope.users[index].emails,
            };
            $scope.user = $scope.users[index];
        }

        function updateUser() {
            var selectedUser = $scope.selectedUser;
            var changeUser = $scope.user;

            if(angular.isUndefined(changeUser.username)|| changeUser.username.trim() === "" || changeUser.username === null) {
                $scope.errorMessage = "Please enter a username";
                return;
            }

            if(angular.isUndefined(changeUser.password)|| changeUser.password.trim() === "" || changeUser.password === null) {
                $scope.errorMessage = "Please enter a password";
                return;
            }

            if(angular.isUndefined(changeUser.role)|| changeUser.role.trim() === "" || changeUser.role === null) {
                $scope.errorMessage = "Please enter a role";
                return;
            }

            UserService.updateUser(changeUser._id, changeUser)
                .then(function() {
                    $scope.message = "Form updated successfully";
                    viewAllUsersButCurrent();
                });
        }


    }
}());