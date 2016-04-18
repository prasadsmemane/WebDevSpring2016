module.exports = function(app, newsModel) {
    app.post("/api/project/user/:userId/news", addFavouriteNews);
    app.get("/api/project/user/:userId/news", getFavouriteNews);
    app.post("/api/project/user/:userId/taste", findUsersWithSameTaste);

    function addFavouriteNews(req, res) {
        var userId = req.params.userId;
        var news = req.body;

        newsModel.addFavouriteNews(userId, news)
            .then(
                function (doc) {
                    res.json(doc.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFavouriteNews(req, res) {
        var userId = req.params.userId;

        newsModel.getFavouriteNews(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUsersWithSameTaste(req, res) {
        var userId = req.params.userId;
        var news = req.body;

        newsModel.getUsersWithSameTaste(userId, news)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};