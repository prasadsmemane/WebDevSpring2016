module.exports = function(app, db, mongoose, aUserModel, pUserModel, passport) {
    var sportsModel = require("./models/sports.model.server.js")(db, mongoose);
    var sportsService  = require("./services/sports.service.server.js")(app, sportsModel);

    var userService  = require("./services/user.service.server.js")(app, pUserModel);

    var newsModel    = require("./models/news.model.server.js")(db, mongoose);
    var newsService  = require("./services/news.service.server.js")(app, newsModel);

    var https = require('https');
    var fantasyDataService = require("./services/fantasydata.service.server.js")(app, pUserModel, sportsModel, https);
    var securityService = require("./../../security/security.js")(app, aUserModel, pUserModel, passport);
}
