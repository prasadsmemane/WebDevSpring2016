(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var model = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserById: findUserById,
            findAllUsers: findAllUsers,
            findAllMembers: findAllMembers,

            setCurrentUser: setCurrentUser,
            findUserByCredentials: findUserByCredentials,
            loginUserByCredentials: loginUserByCredentials
        };
        return model;

        //Set the current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //Create a new User
        function createUser(user) {
            user.role = "member";
            return $http.post("/api/project/user", user);
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
            return $http.delete("/api/project/user/" + userId);
        }

        //Return all the users
        function findAllUsers() {
            return $http.get("/api/project/user");
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
            }
            return $http.post("/api/project/login", credentials);
        }

        function findAllMembers() {
            return $http.get("/api/project/user/members");
        }

    }

}());
