module.exports = function(app, db, mongoose, aUserModel, pUserModel, passport) {
    var userService  = require("./services/user.service.server.js")(app, aUserModel);

    var formModel    = require("./models/form.model.server.js")(db, mongoose);
    var formService  = require("./services/form.service.server.js")(app, formModel);

    var fieldModel    = require("./models/field.model.server.js")(db, mongoose);
    var fieldService  = require("./services/field.service.server.js")(app, fieldModel);

    var securityService = require("./../../security/security.js")(app, aUserModel, pUserModel, passport);
};