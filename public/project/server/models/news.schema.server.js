module.exports = function(mongoose) {
    var NewsSchema = mongoose.Schema({
        title: String,
        content: String,
        url: String
    }, {collection: 'news'});

    return NewsSchema;
};