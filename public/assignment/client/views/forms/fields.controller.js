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

        x.sendEdit = sendEdit;

        if($routeParams.formId) {
            formId = $routeParams.formId;
        }

        function init() {
            FieldService.getFieldsForForm(formId).then(function(response) {
                x.fields = response.data;
            });

            FormService.findFormById(formId).then(function(response) {
                x.form = response.data;
            });
        }

        init();

        function addSameField(field) {
            FieldService.createFieldForForm(formId, field)
                .then(init());
        }

        function deleteField(field) {

        }


        function reOrderField() {
            x.form.fields = x.fields;
            FormService.updateFormById(formId, x.form)
                .then(init());
        }

        function addField(fieldType) {

        }

        function editField(field) {

            x.editedField = field;

            //If placeholder present get it, else use default placeholder
            if(field.placeholder){
                x.placeholder = field.placeholder;
            }

            var isOptions = !(x.editedField.type === 'TEXT' || x.editedField.type === 'TEXTAREA');

            if(isOptions){
                var opt =field.options;
                var optionList = [];
                for(var o in opt){
                    optionList.push(opt[o].label + ":" + opt[o].value + "\n");
                }
                x.editedField.options = optionList;
            }

            x.label = field.label;

        }

        function sendEdit() {
            if(x.editedField.placeholder) {
                x.editedField.placeholder = x.placeholder;
            }

            x.editedField.label = x.label;

            var isOptions = !(x.editedField.type === 'TEXT' || x.editedField.type === 'TEXTAREA');

            if(isOptions){
                var opt =x.options.split("\n");
                var optionList = [];
                for(var o in opt){
                    var s = opt[o].split(":");
                    optionList.push({"label":s[0], "value":s[1]});
                }
                x.editedField.options = optionList;
            }

            FieldService.updateField(formId, x.editedField._id, x.editField())
                .then(init());

        }

    }
}());