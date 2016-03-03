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
            findFormById: findFormById,
            checkIfFormExists : checkIfFormExists
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: new Date().getTime(),
                title: form.title,
                userId: userId
            };
            forms.push(newForm);
            callback();
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
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback();
        }

        function updateFormById(formId, newForm, callback) {
            forms.forEach(function(f) {
                if(f._id === formId) {
                    f.title = newForm.title;
                }
            });
            callback();
        }

        function findFormById(formId) {
            forms.forEach(function(f) {
                if (f._id === formId) {
                    return f;
                }
            });
            return null;
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