var q = require('q');
var ObjectId = require('mongodb').ObjectID;
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var FormModel = mongoose.model('Form');

    var api = {
        createFormField: createFormField,
        deleteFormFieldById: deleteFormFieldById,
        findAllFieldsById: findAllFieldsById,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField
    };

    return api;

    function createFormField(formId, field) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    //field._id = uuid.v1();
                    field._id = new ObjectId();
                    doc.fields.push(field);
                    doc.save(
                        function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function deleteFormFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.fields.id(fieldId).remove();
                    doc.save(
                        function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function findAllFieldsById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var fields = doc.fields;
                    deferred.resolve(fields);
                }
            });

        return deferred.promise;
    }

    function findFormFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields.id(fieldId));
                }
            });

        return deferred.promise;
    }

    function updateFormField(formId, fieldId, newField) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var formField = doc.fields.id(fieldId);
                    formField.label = newField.label || formField.label;
                    formField.type = newField.type || formField.type;
                    if (formField.type != "DATE") {
                        if (formField.type == "TEXT" || formField.type == "TEXTAREA") {
                            formField.placeholder = newField.placeholder || formField.placeholder;
                        }
                        else {
                            formField.options = newField.options || formField.options;
                        }
                    }
                    doc.save(
                        function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        });
                    deferred.resolve(formField);
                }
            });

        return deferred.promise;
    }

};

