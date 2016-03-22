(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController)

    function FieldsController(FormService, FieldService, $routeParams) {

        var x = this;
        var formId;
        x.editedField = null;

        x.editField = editField;
        x.addSameField = addSameField;
        x.deleteField = deleteField;
        x.reOrderField = reOrderField;

        x.addField = addField;

        if($routeParams.formId) {
            formId = $routeParams.formId;
        }

        function init() {
            FieldService.getFieldsForForm(formId).then(function(response) {
                x.fields = response.data;
                console.log(response.data);
            });

            FormService.findFormById(formId).then(function(response) {
                x.form = response.data;
                console.log(response.data);
            });
        }

        init();

        function editField(field) {

        }

        function addSameField(field) {

        }

        function deleteField(field) {

        }

        function reOrderField(field) {

        }

        function addField(fieldType) {

        }

    }
}());