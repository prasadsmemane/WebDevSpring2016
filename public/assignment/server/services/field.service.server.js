module.exports = function(app, formModel) {
    app.get("/api/assignments/form/:formId/field", findAllFieldsById);
    app.get("/api/assignments/form/:formId/field/:fieldId", findFormFieldById);
    app.delete("/api/assignments/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignments/form/:formId/field", createFormField);
    app.put("/api/assignments/form/:formId/field/:fieldId", updateFormField);

    function findAllFieldsById(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsById(formId);
        res.json(fields);
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFormFieldById(formId, fieldId);
        res.json(field);
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFormFieldById(formId, fieldId);
        res.json(fields);
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.createFormField(formId, field);
        res.json(fields);
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedField = formModel.updateFormField(formId, fieldId, field);
        res.json(updatedField);
    }


}
