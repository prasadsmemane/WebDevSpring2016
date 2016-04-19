(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("FavNewsController", FavNewsController)

    function FavNewsController(UserService, $rootScope, $location) {
        var vm = this;

        vm.otherMembers = otherMembers;

        function init() {
            UserService.getFavNewsForUser($rootScope.currentUser._id)
                .success(function (response) {
                    vm.favNews = response;
                });
        }
        init();

        function otherMembers(news) {
            var selectNews = {
                Title: news.title,
                Content: news.content,
                Url: news.url
            };
            $rootScope.tasteNews = selectNews;

            if($rootScope.currentUser != undefined) {
                UserService.findUsersWithSameTaste($rootScope.currentUser._id, selectNews)
                    .success(function(response) {
                        $rootScope.sameTasteUsers = response;
                        $location.url('/sameTaste');
                    });
            }
            else {
                vm.errorMessage = "Please login to check who has the same taste.."
            }
        }

    }

}());
