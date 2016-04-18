(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("FavNewsController", FavNewsController)

    function FavNewsController($scope, UserService, $rootScope) {

        function init() {
            UserService.getFavNewsForUser($rootScope.currentUser._id)
                .success(function (response) {
                    $scope.favNews = response;
            });
        }
        init();

    }

}());
