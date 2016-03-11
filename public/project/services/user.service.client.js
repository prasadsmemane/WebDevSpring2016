(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", email: "alice@alice.com",
                    "sports": ["Cricket"], role: "member"
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", email: "bob@bob.com",
                    "sports": ["Tennis"], role: "admin"
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", email: "charlie@charlie.com",
                    "sports": ["Football"], role: "member"
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", email:"dan@dan.com",
                    "sports": ["Football", "Cricket"], role: "member"
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", email:"ed@ed.com",
                    "sports": ["Tennis", "Football"], role: "member"
                }
            ],
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserById: findUserById,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            findUserByCredentials: findUserByCredentials
        };
        return model;

        //Set the current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //Create a new User
        function createUser(user, callback) {
            var newUser = {
                "_id": new Date().getTime(),
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "sports": user.sports,
                "role": "member",
                "email": user.email
            }
            model.users.push(newUser);
            callback(newUser);
        }

        //Update the current user
        function updateUser(userId, user, callback) {
            var currentUser = null;
            model.users.forEach(function(u) {
                if(u._id === userId) {
                    u.firstName = user.firstName;
                    u.lastName = user.lastName;
                    u.username = user.username;
                    u.password= user.password;
                    u.sports = user.sports;
                    u.role = user.role;
                    u.email= user.email;
                    currentUser = u;
                }
            });
            callback(currentUser);
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

        //Return all the users
        function findAllUsers(callback) {
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

    }

}());
