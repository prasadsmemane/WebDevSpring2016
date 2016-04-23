(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, $rootScope, UserService) {
        var vm = this;

        vm.currentUser = $rootScope.currentUser;
        vm.userId = vm.currentUser._id;

        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.performSort = performSort;

        $scope.firstNameBottom = 0;
        $scope.lastNameBottom = 0;
        $scope.userNameBottom = 0;

        function init() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                    performSort("username", 0);
                });
        }
        init();

        function performSort(prop, dir) {
            if(prop == "username") {
                if(dir == 0) {
                    $scope.userNameBottom = -1;
                    dir = 1;
                } else {
                    $scope.userNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = -1;
                $scope.firstNameBottom = -1;
            } else if(prop == "firstName") {
                if(dir == 0) {
                    $scope.firstNameBottom = -1;
                    dir = 1;
                } else {
                    $scope.firstNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = -1;
                $scope.userNameBottom = -1;
            } else if(prop == "lastName") {
                if(dir == 0) {
                    $scope.lastNameBottom = -1;
                    dir = 1;
                } else {
                    $scope.lastNameBottom = -1 * dir;
                }
                $scope.firstNameBottom = -1;
                $scope.userNameBottom = -1;
            }

            vm.users.sort(sortProperty(prop, dir));
        }

        function sortProperty(prop, dir) {
            return function(a, b) {
                if(a[prop] > b[prop]) {
                    return dir;
                } else if(a[prop] < b[prop]) {
                    return -1 * dir;
                }
                return 0;
            }
        }


        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(function(response) {
                    init();
                });
        }

        function addUser(user) {
            vm.message = null;
            vm.errorMessage = null;

            if(angular.isUndefined(user.username)|| user.username.trim() === "" || user.username === null) {
                vm.errorMessage = "Please enter a username";
                return;
            }

            if(angular.isUndefined(user.password)|| user.password.trim() === "" || user.password === null) {
                vm.errorMessage = "Please enter a password";
                return;
            }

            if(angular.isUndefined(user.firstName)|| user.firstName.trim() === "" || user.firstName === null) {
                vm.errorMessage = "Please enter a first name";
                return;
            }

            if(angular.isUndefined(user.lastName)|| user.lastName.trim() === "" || user.lastName === null) {
                vm.errorMessage = "Please enter a last name";
                return;
            }

            if(angular.isUndefined(user.roles) || user.roles === null) {
                vm.errorMessage = "Please enter a role";
                return;
            }

            user.phones = [];
            user.emails = [];


            var roles  = user.roles.toString();
            user.roles = roles.split(",");

            UserService.createUserAdmin(user)
                .then(function(response) {
                    vm.message = "Added user successfully";
                    vm.selectedUser = null;
                    init();
                })
        }

        function selectUser(user) {
            vm.selectedUser = user;
            vm.toBeUpdatedUser = user;
        }

        function updateUser(user) {
            vm.message = null;
            vm.errorMessage = null;

            if(user == null || angular.isUndefined(user.username)|| user.username.trim() === "" || user.username === null) {
                vm.errorMessage = "Please enter a username";
                return;
            }

            if(angular.isUndefined(user.password)|| user.password.trim() === "" || user.password === null) {
                vm.errorMessage = "Please enter a password";
                return;
            }

            if(angular.isUndefined(user.firstName)|| user.firstName.trim() === "" || user.firstName === null) {
                vm.errorMessage = "Please enter a first name";
                return;
            }

            if(angular.isUndefined(user.lastName)|| user.lastName.trim() === "" || user.lastName === null) {
                vm.errorMessage = "Please enter a last name";
                return;
            }

            if(angular.isUndefined(user.roles) || user.roles === null) {
                vm.errorMessage = "Please enter a role";
                return;
            }

            var roles  = user.roles.toString();
            user.roles = roles.split(",");

            UserService.updateUserAdmin(user._id, user)
                .then(function() {
                    vm.message = "Updated user successfully";
                    vm.selectedUser = null;
                    init();
                });
        }


    }
}());