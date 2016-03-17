(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();