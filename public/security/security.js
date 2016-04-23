module.exports = function(app, aUserModel, pUserModel, passport) {

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.hasOwnProperty('phones')) {
            aUserModel.findUserById(user._id).then(function(user) {
                done(null, user);
            }, function(err) {
                done(err, null);
            });
        } else if (user.hasOwnProperty('sports')) {
            pUserModel.findUserById(user._id).then(function(user) {
                done(null, user);
            }, function(err) {
                done(err, null);
            });
        }
    }
};
