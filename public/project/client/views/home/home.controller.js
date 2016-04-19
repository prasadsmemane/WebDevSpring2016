(function () {
    "use strict";

    angular
        .module("SportsBarApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, FantasyDataService, UserService, $rootScope, $location) {
        var vm = this;

        vm.like = like;
        vm.otherMembers = otherMembers;

        init();
        function init() {
            if($rootScope.currentUser == undefined) {
                FantasyDataService.getAllNews()
                    .success(function (response) {
                        var recentNews = [];
                        for (var i in response) {
                            recentNews = recentNews.concat(response[i]);
                        }
                        vm.recentNews = recentNews;
                    });
            }
            else {
                var userId = $rootScope.currentUser._id;
                FantasyDataService.getAllNewsForUser(userId)
                    .success(function (response) {
                        var recentNews = [];
                        for (var i in response) {
                            recentNews = recentNews.concat(response[i]);
                        }

                        UserService.getFavNewsForUser(userId)
                            .success(function(response) {
                                recentNews.forEach(function(news) {
                                    response.forEach(function(favNews) {
                                        if(news.Title == favNews.title) {
                                            news.isDisabled = true;
                                        }
                                    });
                                });
                            });

                        vm.recentNews = recentNews;
                    });
            }
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

        function otherMembers(news) {
            $rootScope.tasteNews = news;
            if($rootScope.currentUser != undefined) {
                UserService.findUsersWithSameTaste($rootScope.currentUser._id, news)
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
