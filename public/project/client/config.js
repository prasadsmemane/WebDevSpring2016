(function(){
    "use strict";
    angular
        .module("SportsBarApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/favNews", {
                templateUrl: "views/users/favNews.view.html",
                controller: "FavNewsController"
            })
            .when("/users", {
                templateUrl: "views/admin/users.view.html",
                controller: "UsersController"
            })
            .when("/sports", {
                templateUrl: "views/admin/sports.view.html",
                controller: "SportsController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/sameTaste", {
                templateUrl: "views/users/sameTaste.view.html",
                controller: "SameTasteController"
            })
            .when("/otherNews", {
                templateUrl: "views/users/otherNews.view.html",
                controller: "OtherNewsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();
