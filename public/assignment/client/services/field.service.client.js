(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http){

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return service;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignments/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignments/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignments/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignments/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignments/form/" + formId + "/field/" + fieldId, field);
        }
    }

})();