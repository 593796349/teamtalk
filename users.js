(function() {
  var mongo;
  mongo = require('mongoskin');
  module.exports = {
    init: function(db, collection_name) {
      if (db == null) {
        db = 'localhost:27017/teamtalk';
      }
      if (collection_name == null) {
        collection_name = 'users';
      }
      this.db = mongo.db(db);
      return this.users = this.db.collection(collection_name);
    },
    all: function() {
      return this.users.find().sort({
        created_at: -1
      }).toArray();
    },
    add: function(user, cb) {
      user.created_at = new Date();
      return this.user.insert(user, cb);
    },
    findOrCreate: function(twitter, cb) {
      return this.users.find({
        screen_name: twitter.screen_name
      }, function(err, user) {
        if (err) {
          return this.add(twitter, cb);
        } else {
          return cb(null, user);
        }
      });
    }
  };
}).call(this);
