(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, FormService) {
        var currentUser = $scope.currentUser;
        var userId = currentUser._id;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        if(currentUser !== undefined || currentUser !== null)
            viewFormsForCurrentUser();

        function viewFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId)
                .then(function(response) {
                    $scope.form = {};
                    $scope.forms = response.data;
                });
        }

        function addForm() {
            var form = $scope.form;
            var formName = form.title;

            if(angular.isUndefined(formName)|| formName.trim() === "" || formName === null) {
                alert("Please enter a form title");
                return;
            }


            FormService.createFormForUser(userId, form)
                .then(function(response) {
                    viewFormsForCurrentUser();
                });
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

            FormService.updateFormById(changeForm._id, changeForm)
                .then(function() {
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

            FormService.deleteFormById(formId)
                .then(function(response) {
                viewFormsForCurrentUser();
            });
        }
    }
}());