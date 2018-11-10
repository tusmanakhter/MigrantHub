var FriendRequest = require('../models/FriendRequest');
var FriendRequestValidator = require('../validators/FriendRequestValidator');
var User = require('../models/MigrantUser');
var qs = require('qs');
var bcrypt = require('bcryptjs');


module.exports = {
  acceptFriendRequest: function (req, res) {
    let parsedObj = qs.parse(req.body);
    User.findOne({ _id: req.user._id, 'friendsList': { $elemMatch: { 'friend_id': parsedObj.requestFrom } } }, {}, function (err, user) {
      if (err) {
        console.log(err);
        res.send("Error finding your friends");
      } else if (user == null) {
        {
          User.update({ _id: req.user._id }, {
            $push: {
              friendsList: {
                friend_id: parsedObj.requestFrom
              }
            }
          }, function (err) {
            if (err) {
              res.send("There was a error accepting friend.");
            } else {
              User.update({ _id: parsedObj.requestFrom }, {
                $push: {
                  friendsList: {
                    friend_id: parsedObj.requestTo
                  }
                }
              }, function (err) {
                if (err) {
                  res.send("There was error adding to your friend's list of friend.");
                } else {
                  FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, function (err) {
                    if (err) {
                      res.send("There was a error removing friend from requestfriend table.");
                    } else {
                      res.send("Friend has been accepted and removed from request friend table");
                    }
                  });
                }
              });
            }
          })
        }
      } else {
        User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.requestFrom }, { "$set": { 'friendsList.$.isFriend': true } }, function (err) {
          if (err) {
            res.send("Unable to unfriend this user");
          }
        });
        User.update({ _id: parsedObj.requestFrom, 'friendsList.friend_id': parsedObj.requestTo }, { "$set": { 'friendsList.$.isFriend': true } }, function (err) {
          if (err) {
            res.send("Unable to unfriend this user");
          }
        });
        FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, function (err) {
          if (err) {
            res.send("There was a error removing friend from requestfriend table.");
          } else {
            res.send("Friend has been accepted and removed from request friend table");
          }
        });
      }
    })
  },
  rejectFriendRequest: function (req, res) {
    let parsedObj = qs.parse(req.body);

    FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, function (err) {
      if (err) {
        res.send("There was a error removing friend from requestfriend table.");
      } else {
        res.send("FriendRequest has been removed from table");
      }
    });
  },
  addFriend: async function (req, res) {
    let parsedObj = qs.parse(req.body);
    let error = await FriendRequestValidator(req.user._id, parsedObj.requestTo);
    if (error == "") {
      let friendRequest = new FriendRequest();

      friendRequest.requestFrom = req.user._id;
      friendRequest.requestTo = parsedObj.requestTo;

      friendRequest.save(function (err) {
        if (err) {
          res.send({ isError: true, message: 'Yikes. Unable to add friend. :( ' });
        } else {
          res.send({ isError: false, message: 'Woohoo! The request has successfully been sent :) ' });
        }
      });
    } else {
      res.send({ isError: true, message: error });
    }
  },
  unfriend: function (req, res) {
    let parsedObj = qs.parse(req.body);
    User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.friendId }, { "$set": { 'friendsList.$.isFriend': false } }, function (err) {
      if (err) {
        res.send("Unable to unfriend this user");
      }
    });
    User.update({ _id: parsedObj.friendId, 'friendsList.friend_id': req.user._id }, { "$set": { 'friendsList.$.isFriend': false } }, function (err) {
      if (err) {
        res.send("Unable to unfriend this user");
      }
      else {
        res.send("User has been removed from your friend list");
      }
    });
  },
  getFriendRequests: function (req, res) {
    FriendRequest.find({ requestTo: req.user._id }, function (err, friends) {
      if (err) {
        res.send("There was a error saving friend.");
      } else {
        res.send(friends);
      }
    });
  },
  getFriendsList: function (req, res) {
    User.aggregate(([
      { $match: { _id: req.user._id } },
      {
        $project: {
          friendsList: {
            $filter: {
              input: '$friendsList',
              as: 'friends',
              cond: { $eq: ['$$friends.isFriend', true] }
            }
          }
        }
      }
    ]), function (err, user) {
      res.send(user);
    })
  }
};