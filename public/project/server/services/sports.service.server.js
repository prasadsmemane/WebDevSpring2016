module.exports = function(app, sportsModel) {
    app.post("/api/project/sports", createNewSports);
    app.get("/api/project/sports", findAllSports);
    app.delete("/api/project/sports/:id", deleteSportById);

    function createNewSports(req, res) {
        var sport = req.body;

        sportsModel.createNewSports(sport)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllSports(req, res) {
        sportsModel.findAllSports()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteSportById(req, res) {
        var sportsId = req.params.id;

        sportsModel.deleteSportById(sportsId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


};
