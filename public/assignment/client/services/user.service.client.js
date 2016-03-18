(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var service = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserByCredentials: findUserByCredentials,
            loginUserByCredentials: loginUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return service;

        //Set the current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //Get the current user
        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        //Create a new User
        function createUser(user) {
            return $http.post("/api/assignments/user", user);
        }

        //Update the current user
        function updateUser(userId, user) {
            return $http.put("/api/assignments/user/" + userId, user);
        }

        //Delete user by id
        function deleteUserById(userId) {
            return $http.delete("/api/assignments/user/" + userId);
        }

        //Find user by credentials
        function findUserByCredentials(username, password) {
            return $http.post("/api/assignment/user?username=" + username + "&password=" + password);
        }

        //Return all the users
        function findAllUsers() {
            return $http.get("/api/assignments/user");
        }

        //Login user by credentials
        function loginUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            }
            return $http.post("/api/assignment/login", credentials);
        }

    }

}());