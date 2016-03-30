module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/members", findAllMembers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/login", login);

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(user);
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findAllMembers(req, res) {
        res.json(userModel.findAllMembers())
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user);
        res.json(updatedUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        console.log(userId);
        var user = userModel.deleteUserById(userId);
        res.json(userModel.findAllUsers());
    }

    function login(req, res) {
        var credentials = req.body;
        var currentUser = userModel.findUserByCredentials(credentials);
        res.json(currentUser);
    }

}