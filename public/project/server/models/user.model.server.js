var uuid = require('node-uuid');
var q = require('q');

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('Users', UserSchema);

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
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.update({_id: userId}, {$set: user}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.findById(userId, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findAllMembers() {
        var deferred = q.defer();

        UserModel.find({"role" : "member"}, function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

};