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
            $http.post("/api/assignment/user/" + userId + "/form", newForm);
        }

        function findAllFormsForUser(userId) {
            $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            $http.put("/api/assignment/form/" + formId, newForm)
        }

        function findFormById(formId) {
            $http.get("/api/assignment/form/" + formId);
        }

        function checkIfFormExists(userId, formName) {
            var formsByName = forms.filter(function(form) {
                return (form.userId == userId && form.title == formName);
            });

            if(formsByName.length != 0)
                return true;
            else
                return false;
        }

    }
}());