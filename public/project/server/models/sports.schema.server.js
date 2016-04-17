module.exports = function(mongoose) {
  var SportsSchema = mongoose.Schema({
    name: String,
    key: String
  }, {collection: 'sports'});

  return SportsSchema;
};