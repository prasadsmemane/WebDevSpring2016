(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("UsersController", UsersController)

    function UsersController($scope, $rootScope, UserService) {
        var currentUser = $rootScope.currentUser;

        $scope.updateUserEmail = updateUserEmail;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.viewAllUsers = viewAllUsers;

        if(currentUser.role === "admin")
            viewAllUsers();

        function viewAllUsers() {
            UserService.findAllUsers(function (users) {
                $scope.user = {};
                $scope.users = users;

            });
        }

        function updateUserEmail() {
            var selectedUser = $scope.selectedForm;
            var updateUser = $scope.user;

            if(angular.equals(selectedUser, updateUser)) {
                alert("Please don't use the same form title");
                return;
            }

            var updateEmail = updateUser.email;
            console.log("Changed EMail: " + updateEmail);

            if(angular.isUndefined(updateEmail)|| updateEmail.trim() === "" || updateEmail === null) {
                alert("Please enter an email address");
                return;
            }

            UserService.updateUser(updateUser._id, updateUser, function(user) {
                console.log(user.email + " UpdatedUser Callback");
                viewAllUsers();
            });
        }

        function deleteUser(index) {
            var userId = $scope.users[index]._id;

            UserService.deleteUserById(userId, function(users) {
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
                "role" : $scope.users[index].role,
            };
            $scope.user = changeEmail;
        }
    }
}());
