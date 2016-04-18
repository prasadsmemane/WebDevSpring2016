(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("OtherNewsController", OtherNewsController)

    function OtherNewsController($scope, $rootScope, UserService) {

        init();
        function init() {
            UserService.getFavNewsForUser($rootScope.sameTasteUser._id)
                .success(function(response) {
                    $scope.favNews = response;
                })
        }
    }

}());
