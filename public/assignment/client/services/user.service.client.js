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

            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
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
        function createUser(user, callback) {
            var newUser = {
                "_id": new Date().getTime(),
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "roles": [],
                "email": user.email
            }
            console.log(newUser);
            model.users.push(newUser);
            callback(newUser);
        }

        //Update the current user
        function updateUser(userId, user, callback) {
            var currentUser = findUserById(userId);
            var updatedUser = {
                "_id": userId,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "roles": currentUser.roles,
                "email": user.email
            }
            model.users[currentUser] = updatedUser;
            callback(updatedUser);
        }

        //Find user by id
        function findUserById(userId) {
            for(var user in model.users) {
                if(model.users[user]._id === userId) {
                    return model.users[user];
                }
            }
            return null;
        }

        //Delete user by id
        function deleteUserById(userId, callback) {
            var userToBeDeleted = findUserById(userId);
            model.users.splice(userToBeDeleted, 1);
            callback(model.users);
        }

        //Find user by credentials
        function findUserByCredentials(username, password) {
            return $http.post("/api/assignment/user?username=" + username + "&password=" + password);
        }

        //Return all the users
        function findAllUsers(callback) {
            callback(model.users);
        }

    }

}());