(function () {
    "use strict";

    angular
        .module("SportsBarApp")
        .controller("HomeController", HomeController)

    function HomeController($scope, FantasyDataService, UserService, $rootScope, $location) {

        $scope.like = like;
        $scope.otherMembers = otherMembers;

        init();
        function init() {
            if($rootScope.currentUser == undefined) {
                FantasyDataService.getAllNews()
                    .success(function (response) {
                        var recentNews = [];
                        for (var i in response) {
                            recentNews = recentNews.concat(response[i]);
                        }
                        $scope.recentNews = recentNews;
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

                        $scope.recentNews = recentNews;
                    });
            }
        }

        function like(index) {
            if($rootScope.currentUser != undefined) {
                var favNews = {
                    title: $scope.recentNews[index].Title,
                    content: $scope.recentNews[index].Content,
                    url: $scope.recentNews[index].Url
                };
                UserService.addFavouriteNews($rootScope.currentUser._id, favNews)
                    .success(function(response) {
                        $scope.recentNews[index].isDisabled = true;
                    });
            }
            else {
                $scope.errorMessage = "Please login to add news to your like bucket.."
            }
        }

        function otherMembers(index) {
            $rootScope.tasteNews = $scope.recentNews[index];
            if($rootScope.currentUser != undefined) {
                UserService.findUsersWithSameTaste($rootScope.currentUser._id, $scope.recentNews[index])
                    .success(function(response) {
                        $rootScope.sameTasteUsers = response;
                        $location.url('/sameTaste');
                    });
            }
            else {
                $scope.errorMessage = "Please login to check who has the same taste.."
            }
        }

    }
}());
