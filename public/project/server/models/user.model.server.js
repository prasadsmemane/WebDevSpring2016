var uuid = require('node-uuid');
var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserById: findUserById,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findAllMembers: findAllMembers,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function createUser(user) {
        user._id = uuid.v1();
        users.push(user);
        return user;
    }

    function updateUser(userId, user) {
        for(var u in users) {
            if(users[u]._id == userId) {
                users[u].firstName = user.firstName || users[u].firstName;
                users[u].lastName = user.lastName || users[u].lastName;
                users[u].username = user.username || users[u].username;
                users[u].password = user.password || users[u].password;
                users[u].sports = user.sports || users[u].sports;
                users[u].rolse = user.role || users[u].role;
                users[u].email = user.email || users[u].email;
                return users[u];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var user in users) {
            if(users[user]._id == userId) {
                return users[user];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var user in users) {
            if(users[user]._id == userId) {
                users.splice(user, 1);
                break;
            }
        }
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findAllMembers() {
        var members = users.filter(function (u) {
            return u.role == "member";
        });
        return members
    }

    function findUserByCredentials(credentials) {
        var userPresent = null;
        for(var user in users) {
            if(users[user].username === credentials.username && users[user].password === credentials.password) {
                userPresent = users[user];
                break;
            }
        }
        return userPresent;
    }

}