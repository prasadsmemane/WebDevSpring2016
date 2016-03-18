(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        $scope.errorMessage = null;
        $scope.message = null;


        $scope.update = update;



        function update(){
            $scope.errorMessage = null;
            $scope.message = null;
            if (!$scope.currentUser.username){
                $scope.errorMessage = "Username cannot be empty";
                return;
            }
            if (!$scope.currentUser.password){
                $scope.errorMessage = "Password cannot be empty";
                return;
            }

            UserService
                .updateUser($scope.currentUser._id, $scope.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $scope.message = "Profile Successfully Updated";
                });
        }

    }
}());