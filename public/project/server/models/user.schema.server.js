module.exports = function(mongoose) {
  var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    sports: [String]
  }, {collection: 'users'});

  return UserSchema;
};