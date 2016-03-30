var uuid = require('node-uuid');
var sports = require("./sports.mock.json");

module.exports = function() {
    var api = {
        createNewSports: createNewSports,
        findAllSports: findAllSports,
        deleteSportById: deleteSportById
    };

    return api;

    function createNewSports(sport) {
        sport._id = uuid.v1();
        sports.push(sport);
        return sports;
    }

    function findAllSports() {
        return sports;
    }

    function deleteSportById(sportId) {
        for(var s in sports) {
            if(sports[s]._id === sportId) {
                sports.splice(s, 1);
                return;
            }
        }
    }

}