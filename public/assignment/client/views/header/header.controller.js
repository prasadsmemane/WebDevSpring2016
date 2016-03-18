(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        $scope.isActive = isActive;
        $scope.logout = logout;

        function isActive(route) {
            return route === $location.path();
        }

        function logout(){
            UserService.setCurrentUser(undefined);
            $location.url('/home');
        }
    }
}());