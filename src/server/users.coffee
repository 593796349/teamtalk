mongo = require 'mongoskin'

module.exports =
  init: (db = 'localhost:27017/teamtalk', collection_name = 'users') ->
    @db = mongo.db(db)
    @users = @db.collection(collection_name)
  all: (cb) -> 
    @users.find().sort({created_at: -1}).toArray cb
  add: (user, cb) ->
    user.created_at = new Date()
    @users.insert user, cb
    
  findOrCreate: (twitter, cb) -> 
    @add twitter
    @users.find({screen_name: twitter.screen_name}, {sort: { created_at: -1}}).toArray (err, users) ->
      if users then cb(err, users[0]) else @add(twitter, cb)
