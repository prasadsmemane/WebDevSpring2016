var forms = require('./form.mock.json');

module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,

        createFormField: createFormField,
        deleteFormFieldById: deleteFormFieldById,
        findAllFieldsById: findAllFieldsById,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField
    }

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: new Date().getTime(),
            title: form.title,
            userId: userId
        };
        forms.push(newForm);
        return forms;
    }

    function deleteFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (var f in forms) {
            if (forms[f].userId == userId) {
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function findFormById(formId) {
        for(var f in forms) {
            if (forms[f]._id === formId) {
                return forms[f];
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function findFormByTitle(title) {
        for(var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for(var f in forms) {
            if(forms[f]._id === formId) {
                forms[f].title = newForm.title;
                return forms[f];
            }
        }
        return null;
    }

    function createFormField(formId, field) {
        for(var f in forms) {
            if(forms[f]._id == formId){
                field._id = (new Date()).getTime();
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
