var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {
    var auth = authorized;

    app.delete("/api/project/user/:id", auth, deleteUserById);
    app.get("/api/project/user/members", auth, findAllMembers);

    app.post("/api/project/register", register);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/project/user/:id", updateUserById);

    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedIn);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function register(req, res) {
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

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllMembers(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllMembers()
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

        userModel.findUserById(userId)
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

    function deleteUserById(req, res) {
        var userId = req.params.id;

        if (isAdmin(req.user)) {
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

    function login(req, res) {
        var user = req.user;

        delete user.password;
        res.json(user);
    }

    function isAdmin(user) {
        return user.role.indexOf("admin") > -1;
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};