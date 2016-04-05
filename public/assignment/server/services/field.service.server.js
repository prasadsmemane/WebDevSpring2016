module.exports = function(app, fieldModel) {
    app.get("/api/assignments/form/:formId/field", findAllFieldsById);
    app.get("/api/assignments/form/:formId/field/:fieldId", findFormFieldById);
    app.delete("/api/assignments/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignments/form/:formId/field", createFormField);
    app.put("/api/assignments/form/:formId/field/:fieldId", updateFormField);

    function findAllFieldsById(req, res) {
        var formId = req.params.formId;

        fieldModel.findAllFieldsById(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.findFormFieldById(formId, fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteFormFieldById(formId, fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFormField(formId, field)
            .then(
                function(doc) {
                    res.json(doc.fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        fieldModel.updateFormField(formId, fieldId, field)
            .then(
                function(doc) {
                    //Find the updated field and return
                    fieldModel.findFormFieldById(formId, fieldId)
                        .then(
                            function(doc) {
                                res.json(doc);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};
