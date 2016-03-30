module.exports = function(app) {
    var sportsModel = require("./models/sports.model.server.js")();
    var sportsService  = require("./services/sports.service.server.js")(app, sportsModel);

    var userModel = require("./models/user.model.server.js")();
    var userService  = require("./services/user.service.server.js")(app, userModel);
}
