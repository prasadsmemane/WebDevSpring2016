(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $route) {
        var vm = this;
        vm.isActive = isActive;
        vm.isAdmin = isAdmin;
        vm.logout = logout;

        function isActive(route) {
            return route === $location.path();
        }

        function isAdmin() {
            var currentUser = vm.currentUser;
            if(angular.isUndefined(currentUser))
                return false;
            return currentUser.roles.indexOf('admin') !== -1;
        }

        function logout(){
            UserService.logout()
                .then(function(){
                    UserService.setCurrentUser(undefined);
                    $route.reload();
                    $location.url('/home');
                });
        }

    }
}());
