(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("SearchController", SearchController)

    function SearchController(SportsService, FantasyDataService, UserService, $rootScope, $location) {
        var vm = this;

        vm.errorMessage = null;
        vm.searchPlayer = null;
        vm.searchButtonText = "Search";
        vm.test = false;

        vm.search = search;
        vm.like = like;
        vm.otherMembers = otherMembers;

        init();
        function init() {
            SportsService.findAllSports()
                .then(function(response) {
                    vm.selectedSports = response.data[0];
                    vm.sports = response.data;
                });
        }

        function search(sport, player) {
            vm.errorMessage = null;

            if(player) {
                vm.searchButtonText = "Searching";
                vm.test = true;

                if(angular.isUndefined($rootScope.currentUser)) {
                    FantasyDataService.searchSportsPlayer(sport, player)
                        .then(function (response) {
                            vm.sportsTeamNews = response.data;
                            vm.searchButtonText = "Search";
                            vm.test = false;
                        });
                }
                else {
                    var userId = $rootScope.currentUser._id;
                    FantasyDataService.searchSportsPlayer(sport, player)
                        .then(function (response) {
                            var sportsTeamNews = response.data;
                            UserService.getFavNewsForUser(userId)
                                .success(function(response) {
                                    sportsTeamNews.forEach(function(news) {
                                        response.forEach(function(favNews) {
                                            if(news.Title == favNews.title) {
                                                news.isDisabled = true;
                                            }
                                        });
                                    });
                                });
                            vm.sportsTeamNews = response.data;
                            vm.searchButtonText = "Search";
                            vm.test = false;
                        });
                }
            }
            else {
                vm.errorMessage = "Please specify a player name";
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