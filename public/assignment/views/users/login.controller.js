(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController)

    function loginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(username, password) {
            //var username = $scope.username;
            //var password = $scope.password;
            console.log(username);
            console.log(password);
            UserService.findUserByCredentials(username, password, function(callback) {
                if (angular.isUndefined(callback) || callback === null) {
                    $rootScope.currentUser = callback;
                    UserService.setCurrentUser(callback);
                    $location.url('/profile');
                }
            });
        }
    }
}());