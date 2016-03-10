(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope) {
        $scope.isAdmin = isAdmin;

        function isAdmin() {
            var currentUser = $scope.currentUser;
            if(angular.isUndefined(currentUser))
                return false;
            return currentUser.roles.indexOf('admin') !== -1;
        }
    }
}());
