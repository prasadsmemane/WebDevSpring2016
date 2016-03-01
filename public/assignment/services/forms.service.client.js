(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {
                "_id": "000", "title": "Contacts", "userId": 123
            },
            {
                "_id": "010", "title": "ToDo", "userId": 123
            },
            {
                "_id": "020", "title": "CDs", "userId": 234
            }
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: new Date().getTime(),
                title: form.title,
                userId: userId
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var f in forms) {
                if (forms[f].userId == userId) {
                    userForms.push(forms[f]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var formToDelete = findFormById(formId);
            forms.splice(formToDelete, 1);
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var currentForm = findFormById(formId);
            var updatedForm = {
                _id: formId,
                title: newForm.title,
                userId: newForm.userId
            }

            forms[currentForm] = updatedForm;
            callback(updatedForm);
        }

        function findFormById(formId) {
            for (var form in forms) {
                if (forms[form]._id === formId) {
                    return forms[form];
                }
            }
            return null;
        }

    }
}());