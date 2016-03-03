(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, $location, FormService) {
        var currentUser = $scope.currentUser;
        var userId = currentUser._id;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        if(currentUser !== undefined || currentUser !== null)
            viewFormsForCurrentUser();

        function viewFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId, function(forms) {
                $scope.form = {};
                $scope.forms = forms;
            });
        }

        function addForm() {
            var form = $scope.form;
            var formName = form.title;
            var check = FormService.checkIfFormExists(userId, formName);

            if(angular.isUndefined(formName)|| formName.trim() === "" || formName === null) {
                alert("Please enter a form title");
                return;
            }

            if(check === false) {
                FormService.createFormForUser(userId, form, function() {
                    viewFormsForCurrentUser();
                });
            }
            else {
                alert("Form title already exists");
            }
        }

        function updateForm() {
            var selectedForm = $scope.selectedForm;
            var changeForm = $scope.form;

            if(angular.equals(selectedForm, changeForm)) {
                alert("Please don't use the same form title");
                return;
            }

            var formName = changeForm.title;

            if(angular.isUndefined(formName)|| formName.trim() === "" || formName === null) {
                alert("Please enter a form title");
                return;
            }

            FormService.updateFormById(changeForm._id, changeForm, function() {
                viewFormsForCurrentUser();
            });
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            var changeForm = {
                "_id" : $scope.forms[index]._id,
                "userId" : $scope.forms[index].userId,
                "title" : $scope.forms[index].title
            };
            $scope.form = changeForm;
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;

            FormService.deleteFormById(formId, function() {
                viewFormsForCurrentUser();
            });
        }
    }
}());