(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

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
                "email": user.email
            }
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
        function findUserByCredentials(username, password, callback) {
            var userPresent = null;
            for(var user in model.users) {
                if(model.users[user].username === username && model.users[user].password === password) {
                    userPresent = model.users[user];
                    break;
                }
            }
            callback(userPresent);
        }

        //Return all the users
        function findAllUsers(callback) {
            callback(model.users);
        }

    }

}());