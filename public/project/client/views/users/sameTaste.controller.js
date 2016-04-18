(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SameTasteController", SameTasteController)

    function SameTasteController($scope, $rootScope, $location) {
        $scope.newsTheyLike = newsTheyLike;
        $scope.message = message;

        function newsTheyLike(index) {
            $rootScope.sameTasteUser = $rootScope.sameTasteUsers[index];
            $location.url("/otherNews");
        }

        function message(index) {
            var messageUSer = $rootScope
        }
    }

}());