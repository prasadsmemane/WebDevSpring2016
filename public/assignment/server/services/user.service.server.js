module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/login", login);

    function createUser(req, res) {
            var user = req.body;
            user = userModel.createUser(user);
            res.json(userModel.findAllUsers());
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        console.log(credentials);
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user);
        res.json(userModel.findAllUsers());
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.deleteUserById(userId);
        res.json(userModel.findAllUsers());
    }

    function login(req, res) {
        var credentials = req.body;
        var currentUser = userModel.findUserByCredentials(credentials);
        res.json(currentUser);
    }

};