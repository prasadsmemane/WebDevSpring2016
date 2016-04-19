(function(){
    "use strict";
    angular
        .module("SportsBarApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: isLoggedin
                }
            })
            .when("/favNews", {
                templateUrl: "views/users/favNews.view.html",
                controller: "FavNewsController",
                controllerAs: "model",
                resolve: {
                    loggedin: isLoggedin
                }
            })
            .when("/users", {
                templateUrl: "views/admin/users.view.html",
                controller: "UsersController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/sports", {
                templateUrl: "views/admin/sports.view.html",
                controller: "SportsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/sameTaste", {
                templateUrl: "views/users/sameTaste.view.html",
                controller: "SameTasteController",
                controllerAs: "model",
                resolve: {
                    loggedin: isLoggedin
                }
            })
            .when("/otherNews", {
                templateUrl: "views/users/otherNews.view.html",
                controller: "OtherNewsController",
                controllerAs: "model",
                resolve: {
                    loggedin: isLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home",
                resolve: {
                    loggedin: isLoggedin
                }
            });
    }

    var isLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else {
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });

        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            if (user !== '0' && user.role.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope, FantasyDataService) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            }

            deferred.resolve();
        });

        return deferred.promise;
    };

})();
