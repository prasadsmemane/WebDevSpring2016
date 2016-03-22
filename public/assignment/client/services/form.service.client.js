(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById,
            checkIfFormExists : checkIfFormExists
        };

        return service;

        function createFormForUser(userId, form) {
            var newForm = {
                _id: new Date().getTime(),
                title: form.title,
                userId: userId
            };
            return $http.post("/api/assignment/user/" + userId + "/form", newForm);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm)
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function checkIfFormExists(userId, formName) {
            return $http.get("/api/assignment/user/" + userId + "/form/" + formName);
        }

    }
}());