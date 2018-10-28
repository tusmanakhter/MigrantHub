var FriendRequest = require('../models/FriendRequest');
var FriendRequestValidator = require('../validators/FriendRequestValidator');
var User = require('../models/MigrantUser');
var qs = require('qs');
var bcrypt = require('bcryptjs');

module.exports = {
  acceptFriendRequest: function(req, res) {
    let parsedObj = qs.parse(req.body);
    User.update({ _id: req.user._id },{$push: {friendsList: {
      friendName: parsedObj.requestFrom
    }}}, function (err) {
        if (err) {
          res.send("There was a error accepting friend.");
          console.log(err)
          console.log("There was a error accepting friend.");
        } else {
          User.update({ _id: parsedObj.requestFrom },{$push: {friendsList: {
            friendName: parsedObj.requestTo
          }}}, function (err) {
              if (err) {
                res.send("There was error adding to your friend's list of friend.");
                console.log(err)
                console.log("There was error adding to your friend's list of friend.");
              } else {
                FriendRequest.findByIdAndDelete({_id: parsedObj._id}, function(err) {
                    if (err) {
                        res.send("There was a error removing friend from requestfriend table.");
                        console.log(err)
                        console.log("There was a error removing friend from requestfriend table.");
                    } else {
                      res.send("Friend has been accepted and removed from request friend table");
                      console.log("Friend has been accepted and removed from request friend table");
                    }
                });
              }
            });
        }
      })
  },
  rejectFriendRequest: function(req, res) {
    let parsedObj = qs.parse(req.body);
    console.log(parsedObj);
    FriendRequest.findByIdAndDelete({_id: parsedObj._id}, function(err) {
      if (err) {
          res.send("There was a error removing friend from requestfriend table.");
          console.log(err)
          console.log("There was a error removing friend from requestfriend table.");
        } else {
          res.send("FriendRequest has been removed from table");
          console.log("FriendRequest has been removed from table");
        }
    });
  },
  addFriend: function(req, res) {
    let parsedObj = qs.parse(req.body);
    let errors = FriendRequestValidator(req.user._id, parsedObj.requestTo);
    if (errors == "") {
      let friendRequest = new FriendRequest();
      friendRequest.requestFrom = req.user._id;
      friendRequest.requestTo = parsedObj.requestTo;
      friendRequest.save(function (err) {
          if (err) {
              res.send('Unable to add friend. :( ')
              console.log(err)
          } else {
              res.send('Friend has been successfully added! :) ');
          }
      });
    } else {
        res.send(errors);
    }
  },
  viewFriends: function (req, res) {
    FriendRequest.find({requestTo: req.user._id}, function(err, friends) {
      if (err) {
          res.send("There was a error saving friend.");
          // Todo: Should create with error
          console.log(err)
        } else {
          res.send(friends);
        }
    });
  }
};