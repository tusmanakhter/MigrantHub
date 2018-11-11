const qs = require('qs');
const FriendRequest = require('../models/FriendRequest');
const FriendRequestValidator = require('../validators/FriendRequestValidator');
const User = require('../models/MigrantUser');


module.exports = {
  acceptFriendRequest(req, res) {
    let parsedObj = qs.parse(req.body);
    User.findOne({ _id: req.user._id, 'friendsList': { $elemMatch: { 'friend_id': parsedObj.requestFrom } } }, {}, (err, user) => {
      if (err) {
        return res.send("Error finding your friends");
      } else if (user == null) {
        {
          User.update({ _id: req.user._id }, {
            $push: {
              friendsList: {
                friend_id: parsedObj.requestFrom
              }
            }
          }, (updateUserError) => {
            if (updateUserError) {
              return res.send("There was a error accepting friend.");
            } else {
              User.update({ _id: parsedObj.requestFrom }, {
                $push: {
                  friendsList: {
                    friend_id: parsedObj.requestTo
                  }
                }
              }, (updateFriendError) => {
                if (updateFriendError) {
                  res.send("There was error adding to your friend's list of friend.");
                } else {
                  FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (findError) => {
                    if (findError) {
                      return res.send("There was a error removing friend from requestfriend table.");
                    }
                    return res.send("Friend has been accepted and removed from request friend table");
                  });
                }
              });
            }
          })
        }
      } else {
        User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.requestFrom }, { "$set": { 'friendsList.$.isFriend': true } }, (updateUserStateError) => {
          if (updateUserStateError) {
            return res.send("Unable to unfriend this user");
          }
        });
        User.update({ _id: parsedObj.requestFrom, 'friendsList.friend_id': parsedObj.requestTo }, { "$set": { 'friendsList.$.isFriend': true } }, (updateUserStateError) => {
          if (updateStateError) {
            return res.send("Unable to unfriend this user");
          }
        });
        FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (findError) => {
          if (findError) {
            return res.send("There was a error removing friend from requestfriend table.");
          }
          return res.send('Friend has been accepted and removed from request friend table');
        });
      }
    });
  },
  rejectFriendRequest(req, res) {
    const parsedObj = qs.parse(req.body);

    FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (err) => {
      if (err) {
        return res.send('There was a error removing friend from requestfriend table.');
      }
      return res.send('FriendRequest has been removed from table');
    });
  },
  async addFriend(req, res) {
    const parsedObj = qs.parse(req.body);
    const error = await FriendRequestValidator(req.user._id, parsedObj.requestTo);
    if (error === '') {
      const friendRequest = new FriendRequest();
      console.log("ERROR PASSED");
      friendRequest.requestFrom = req.user._id;
      friendRequest.requestTo = parsedObj.requestTo;
      console.log(friendRequest.requestFrom);
      console.log(friendRequest.requestTo);
      friendRequest.save((err) => {
        if (err) {
          return res.send({ isError: true, message: 'Yikes. Unable to add friend. :( ' });
        }
        return res.send({ isError: false, message: 'Woohoo! The request has successfully been sent :) ' });
      });
    } else {
      return res.send({ isError: true, message: error });
    }
  },
  unfriend(req, res) {
    let parsedObj = qs.parse(req.body);
    User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.friendId }, { "$set": { 'friendsList.$.isFriend': false } }, (err) => {
      if (err) {
        return res.send("Unable to unfriend this user");
      }
    });
    User.update({ _id: parsedObj.friendId, 'friendsList.friend_id': req.user._id }, { "$set": { 'friendsList.$.isFriend': false } }, (err2) => {
      if (err2) {
        return res.send("Unable to unfriend this user");
      }
      else {
        return res.send("User has been removed from your friend list");
      }
    });
  },
  getFriendRequests(req, res) {
    FriendRequest.find({ requestTo: req.user._id }, (err, friends) => {
      if (err) {
        return res.send("There was a error saving friend.");
      }
      return res.send(friends);
    });
  },
  getFriendsList(req, res) {
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
    ]), (err, user) => {
      return res.send(user);
    })
  }
};
