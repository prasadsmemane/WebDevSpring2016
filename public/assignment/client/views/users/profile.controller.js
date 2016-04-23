(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.errorMessage = null;
        vm.message = null;

        vm.update = update;

        function update(currentUser){
            vm.errorMessage = null;
            vm.message = null;
            if (!currentUser.username){
                $scope.errorMessage = "Username cannot be empty";
                return;
            }
            if (!currentUser.password){
                $scope.errorMessage = "Password cannot be empty";
                return;
            }

            UserService
                .updateUser(currentUser._id, currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    vm.message = "Profile Successfully Updated";
                });
        }

    }
}());