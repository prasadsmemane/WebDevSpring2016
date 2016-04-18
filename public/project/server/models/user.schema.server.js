module.exports = function(mongoose) {

  var NewsSchema = require('./news.schema.server.js')(mongoose);

  var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    sports: [String],
    news: [NewsSchema]
  }, {collection: 'users'});

  return UserSchema;
};