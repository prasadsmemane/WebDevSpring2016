(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .factory("SportsService", FormService);

    function FormService($http) {
        var service = {
            createNewSport: createNewSport,
            findAllSports: findAllSports,
            deleteSportById: deleteSportById
        };

        return service;

        function createNewSport(sport) {
            return $http.post("/api/project/sports", sport);
        }

        function findAllSports() {
            return $http.get("/api/project/sports");
        }

        function deleteSportById(sportId) {
            return $http.delete("/api/project/sports/" + sportId);
        }
    }
}());
