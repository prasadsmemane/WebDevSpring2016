(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("OtherNewsController", OtherNewsController)

    function OtherNewsController($rootScope, UserService) {
        var vm = this;

        vm.like = like;

        init();
        function init() {
            var userId = $rootScope.currentUser._id;
            vm.sameTasteUser = $rootScope.sameTasteUser;
            UserService.getFavNewsForUser($rootScope.sameTasteUser._id)
                .success(function(response) {
                    var allNews = response;

                    UserService.getFavNewsForUser(userId)
                        .success(function(response) {
                            allNews.forEach(function(news) {
                                response.forEach(function(favNews) {
                                    if(news.title == favNews.title) {
                                        news.isDisabled = true;
                                    }
                                });
                            });
                        });

                    vm.favNews = allNews;
                })
        }

        function like(news) {
            if($rootScope.currentUser != undefined) {
                var favNews = {
                    title: news.Title,
                    content: news.Content,
                    url: news.Url
                };

                UserService.addFavouriteNews($rootScope.currentUser._id, favNews)
                    .success(function(response) {
                        news.isDisabled = true;
                    });
            }
            else {
                vm.errorMessage = "Please login to add news to your like bucket.."
            }
        }
    }

}());
