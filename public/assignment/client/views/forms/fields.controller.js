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
            FormService.findFormById(formId).then(function(response) {
                x.form = response.data;
            });

            FieldService.getFieldsForForm(formId).then(function(response) {
                x.fields = response.data;
            });
        }

        init();

        function addSameField(field) {
            FieldService.createFieldForForm(formId, field)
                .then(
                    function(response) {
                        init();
                    }
                );
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(
                    function(response) {
                        init();
                    }
                );
        }

        function reOrderField() {
            x.form.fields = x.fields;
            FormService.updateFormById(formId, x.form)
                .then(
                    function(response) {
                        init();
                    }
                );
        }

        function addField(fieldType) {
            if(angular.isUndefined(fieldType)) {
                alert("Please select a Field!");
                return;
            }
            var field = getCorrespondingField(fieldType);
            FieldService.createFieldForForm(formId, field)
                .then(
                    function(response) {
                        init();
                    }
                );
        }

        function getCorrespondingField(fieldType) {
            switch(fieldType) {
                case "TEXT":
                    return {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

                case "TEXTAREA":
                    return {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

                case "DATE":
                    return {"_id": null, "label": "New Date Field", "type": "DATE"};

                case "OPTIONS":
                    return {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                        {"label": "Option 1", "value": "OPTION_1"},
                                        {"label": "Option 2", "value": "OPTION_2"},
                                        {"label": "Option 3", "value": "OPTION_3"}
                            ]};

                case "CHECKBOXES":
                    return {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                        {"label": "Option A", "value": "OPTION_A"},
                                        {"label": "Option B", "value": "OPTION_B"},
                                        {"label": "Option C", "value": "OPTION_C"}
                            ]};

                case "RADIOS":
                    return {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                        {"label": "Option X", "value": "OPTION_X"},
                                        {"label": "Option Y", "value": "OPTION_Y"},
                                        {"label": "Option Z", "value": "OPTION_Z"}
                            ]};

            }
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

            FieldService.updateField(formId, x.editedField._id, x.editedField)
                .then(
                    function(response) {
                        init();
                    }
                );
        }

    }
}());