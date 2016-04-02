module.exports = function(app, sportsModel) {
    app.post("/api/project/sports", createNewSports);
    app.get("/api/project/sports", findAllSports);
    app.delete("/api/project/sports/:id", deleteSportById);

    function createNewSports(req, res) {
        var sports = req.body;
        sports = sportsModel.createNewSports(sports);
        res.json(sportsModel.findAllSports());
    }

    function findAllSports(req, res) {
        res.json(sportsModel.findAllSports());
    }

    function deleteSportById(req, res) {
        var sportsId = req.params.id;
        var sports = sportsModel.deleteSportById(sportsId);
        res.json(sportsModel.findAllSports());
    }


};
