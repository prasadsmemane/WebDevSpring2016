module.exports = function(app, formModel) {
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(userId, form);
        res.json(formModel.findAllFormsForUser(userId));
    }

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var updatedForm = formModel.updateFormById(formId, form);
        res.json(formModel.findAllForms());
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var deletedForm = formModel.deleteFormById(formId);
        res.send(formModel.findAllForms());
    }

}