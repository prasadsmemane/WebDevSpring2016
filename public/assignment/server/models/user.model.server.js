var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById,

        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
    };

    return api;

    //Create a new User
    function createUser(user) {
        user._id = new Date().getTime();
        users.push(user);
    }

    //Find user by credentials
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

    //Find user by username
    function findUserByUsername(username){
        var userPresent = null;
        for(var user in users){
            if(users[user].username == username){
                userPresent = users[user];
            }
        }
        return userPresent;
    }

    //Find all users
    function findAllUsers() {
        return users;
    }

    //Update user
    function updateUser(userId, user) {
        var updatedUser = null;
        for(var u in users){
            if(users[u]._id == userId){
                users[u].firstName = users[u].firstName || u.firstName;
                users[u].lastName = users[u].lastName || u.lastName;
                users[u].username = users[u].username || u.username;
                users[u].password = users[u].password || u.password;
                updatedUser = users[u];
                break;
            }
        }
        return updatedUser;
    }

    //delete the user
    function deleteUserById(userId) {
        for(var user in users){
            if(users[user]._id == userId){
                users[user].splice(user,1);
                return;
            }
        }
    }

};