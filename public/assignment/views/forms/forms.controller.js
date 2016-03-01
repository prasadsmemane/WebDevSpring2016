(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, $location, FormService) {
        var currentUser = $scope.currentUser;

        if(currentUser !== undefined || currentUser !== null)
            viewFormsForCurrentUser();



        function viewFormsForCurrentUser() {
            var userId = currentUser._id;
            FormService.findAllFormsForUser(userId, function(forms) {
               $scope.forms = forms;
            });
        }


    }
}());