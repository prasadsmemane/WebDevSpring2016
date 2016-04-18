var ObjectId = require('mongodb').ObjectID;
var q = require('q');

module.exports = function(db, mongoose) {

    var UserModel = mongoose.model('Users');

    var api = {
        addFavouriteNews: addFavouriteNews,
        getFavouriteNews: getFavouriteNews,
        getUsersWithSameTaste: getUsersWithSameTaste
    };

    return api;

    function addFavouriteNews(userId, favNews) {
        var deferred = q.defer();

        UserModel.findById(userId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    favNews._id = new ObjectId();
                    doc.news.push(favNews);
                    doc.save(
                        function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function getFavouriteNews(userId) {
        var deferred = q.defer();

        UserModel.findById(userId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var news = doc.news;
                    deferred.resolve(news);
                }
            });

        return deferred.promise;
    }

    function getUsersWithSameTaste(userId, news) {
        var deferred = q.defer();

        UserModel.find(
          function(err, doc) {
              if (err) {
                  deferred.reject(err);
              }
              else {
                  var usersWithSameTaste = [];
                  doc.forEach(function(user){
                      if(user._id != userId) {
                          var favNews = user.news;
                          for (fav in favNews) {
                              if (favNews[fav].title == news.Title) {
                                  usersWithSameTaste.push(user);
                                  break;
                              }
                          }
                      }
                  });
                  deferred.resolve(usersWithSameTaste);
              }
          }
        );

        return deferred.promise;
    }

};
