module.exports = function(app, userModel) {
    var auth = authorized;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    passport.use('assignment', new LocalStrategy(aLocalStrategy));

    app.post("/api/assignment/user", createUser);

    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post("/api/assignments/logout", logout);
    app.get("/api/assignment/loggedin", loggedIn);

    app.post("/api/assignment/admin/user", auth, createUserAdmin);
    app.get("/api/assignment/admin/user", auth, findAllUsers);
    app.put("/api/assignment/admin/user/:id", auth, updateUserAdmin);
    app.get("/api/assignment/admin/user/:id", auth, findUserById);
    app.delete("/api/assignment/admin/user/:id", auth, deleteUserById);

    function aLocalStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function findAllUsers(req, res) {

        if(isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;

        if(isAdmin(req.user)) {
            userModel.deleteUserById(userId)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;

        if(isAdmin(req.user)) {
            userModel.findUserById(userId)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function createUserAdmin(req, res) {
        var newUser = req.body;

        if(isAdmin(req.user)) {
            console.log(req.user);

            userModel.findUserByUsername(newUser.username)
                .then(function(user) {
                        if(user == null) {
                            newUser.password = bcrypt.hashSync(newUser.password);
                            console.log(newUser);
                            return userModel.createUserAdmin(newUser);
                        }
                        else {
                            res.json(null);
                        }
                    },
                    function(err) {
                        res.status(400).send(err);
                    })
                .then(function(user){
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }
    }

    function updateUserAdmin(req, res) {
        var userId = req.params.id;
        var user = req.body;

        delete user._id;

        userModel.findUserById(userId)
            .then(
                function(doc) {
                    if(doc.password != user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    userModel.updateUser(userId, user)
                        .then(
                            function(doc) {
                                res.json(doc);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel.findUserByUsername(newUser.username)
            .then(function(user) {
                    if(user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                    }
                    else {
                        res.json(null);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                })
            .then(function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;

        userModel.findUserByUsername(username)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };

        userModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        delete user._id;

        userModel.findUserById(userId)
            .then(
                function(doc) {
                    if(doc.password != user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    userModel.updateUser(userId, user)
                        .then(
                            function(doc) {
                                res.json(doc);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );
                }
            );
    }

    function login(req, res) {
        var user = req.user;

        delete user.password;
        res.json(user);
    }

    function isAdmin(user) {
        return user.roles.indexOf("admin") > -1;
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};