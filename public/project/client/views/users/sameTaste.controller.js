(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SameTasteController", SameTasteController)

    function SameTasteController($rootScope, $location) {
        var vm = this;
        vm.newsTheyLike = newsTheyLike;

        function init() {
            vm.tasteNews = $rootScope.tasteNews;
            vm.sameTasteUsers = $rootScope.sameTasteUsers;
        }
        init();

        function newsTheyLike(user) {
            $rootScope.sameTasteUser = user;
            $location.url("/otherNews");
        }

    }

}());