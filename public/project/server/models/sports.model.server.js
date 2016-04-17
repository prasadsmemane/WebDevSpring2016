var uuid = require('node-uuid');
var q = require('q');

module.exports = function(db, mongoose) {

    var SportsSchema = require("./sports.schema.server.js")(mongoose);
    var SportsModel = mongoose.model('Sports', SportsSchema);

    var api = {
        createNewSports: createNewSports,
        findAllSports: findAllSports,
        deleteSportById: deleteSportById,
        findSportsByName: findSportsByName
    };

    return api;

    function createNewSports(sport) {
        var deferred = q.defer();

        SportsModel.create(sport, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllSports() {
        var deferred = q.defer();

        SportsModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function deleteSportById(sportId) {
        var deferred = q.defer();

        SportsModel.findByIdAndRemove(sportId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findSportsByName(sportName) {
        var deferred = q.defer();

        SportsModel.find({name: sportName},
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

}