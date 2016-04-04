var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var FormModel = mongoose.model('Form');

    var api = {
        createFormField: createFormField,
        deleteFormFieldById: deleteFormFieldById,
        findAllFieldsById: findAllFieldsById,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField
    }

    return api;

    function createFormField(formId, field) {
        for(var f in forms) {
            if(forms[f]._id == formId){
                field._id = uuid.v1();
                forms[f].fields.push(field);
                return forms[f].fields;
            }
        }
        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        var field = findFormFieldById(formId, fieldId);
        var fields = findAllFieldsById(formId);
        if (field !== null) {
            fields.splice(fields.indexOf(field), 1);
            return fields;
        }
        return null;
    }

    function findAllFieldsById(formId) {
        var form = findFormById(formId);
        if (form !== null) {
            return form.fields;
        }
        return [];
    }

    function findFormFieldById(formId, fieldId) {
        var fields = findAllFieldsById(formId);
        if (fields !== null) {
            for(var fi in fields) {
                if (fields[fi]._id == fieldId) {
                    return fields[fi];
                }
            }
        }
        return null;
    }

    function updateFormField(formId, fieldId, newField) {
        for(var f in forms){
            if(forms[f]._id == formId){
                for(var field in forms[f].fields){
                    if(forms[f].fields[field]._id == fieldId){
                        forms[f].fields[field].label = newField.label || forms[f].fields[field].label;
                        forms[f].fields[field].type = newField.type || forms[f].fields[field].type;
                        if (forms[f].fields[field].type == "TEXT" || forms[f].fields[field].type == "TEXTAREA"){
                            forms[f].fields[field].placeholder = newField.placeholder || forms[f].fields[field].placeholder;
                        }
                        if (forms[f].fields[field].type == "OPTIONS"){
                            forms[f].fields[field].options = newField.options || forms[f].fields[field].options;
                        }
                        return forms[f].fields[field];
                    }
                }
            }
        }
        return null;
    }


}

