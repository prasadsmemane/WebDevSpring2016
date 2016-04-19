(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var model = {
            registerUser: registerUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserById: findUserById,
            findAllMembers: findAllMembers,

            setCurrentUser: setCurrentUser,
            findUserByCredentials: findUserByCredentials,
            loginUserByCredentials: loginUserByCredentials,
            logout: logout,

            addFavouriteNews: addFavouriteNews,
            getFavNewsForUser: getFavNewsForUser,
            findUsersWithSameTaste: findUsersWithSameTaste
        };
        return model;

        //Set the current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //Create a new User
        function registerUser(user) {
            return $http.post("/api/project/register", user);
        }

        //Update the current user
        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        //Find user by id
        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        //Delete user by id
        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/" + userId);
        }

        //Find user by credentials
        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        //Login user by credentials
        function loginUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", credentials);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function findAllMembers() {
            return $http.get("/api/project/admin/members");
        }

        function addFavouriteNews(userId, favNews) {
            return $http.post("/api/project/user/" + userId + "/news", favNews);
        }

        function getFavNewsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/news");
        }

        function findUsersWithSameTaste(userId, news) {
            return $http.post("/api/project/user/" + userId + "/taste", news);
        }

    }

}());
