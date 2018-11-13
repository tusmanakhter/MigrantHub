const qs = require('qs');
const FriendRequest = require('../models/FriendRequest');
const FriendRequestValidator = require('../validators/FriendRequestValidator');
const User = require('../models/MigrantUser');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  acceptFriendRequest(req, res) {
    const parsedObj = qs.parse(req.body);
    User.update({ _id: req.user._id }, {
      $push: {
        friendsList: {
          friendName: parsedObj.requestFrom,
        },
      },
    }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer,'friendController.acceptFriendRequest: update requestTo' , err.message));
        return res.send('There was a error accepting friend.');
      }
      User.update({ _id: parsedObj.requestFrom }, {
        $push: {
          friendsList: {
            friendName: parsedObj.requestTo,
          },
        },
      }, (updateError) => {
        if (updateError) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              updateError.status, req.referer,'friendController.acceptFriendRequest: update requestFrom' , updateError.message));
          return res.send("There was error adding to your friend's list of friend.");
        }
        FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (findError) => {
          if (findError) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              findError.status, req.referer,'friendController.acceptFriendRequest: delete request' , findError.message));
            return res.send('There was a error removing friend from requestfriend table.');
          }
          return res.send('Friend has been accepted and removed from request friend table');
        });
      });
    });
  },
  rejectFriendRequest(req, res) {
    const parsedObj = qs.parse(req.body);

    FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer,'friendController.rejectFriendRequest' , err.message));
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

      friendRequest.requestFrom = req.user._id;
      friendRequest.requestTo = parsedObj.requestTo;

      friendRequest.save((err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'friendController.addFriend' , err.message));
          return res.send({ isError: true, message: 'Yikes. Unable to add friend. :( ' });
        }
        return res.send({ isError: false, message: 'Woohoo! The request has successfully been sent :) ' });
      });
    } else {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          '500', req.referer,'friendController.addFriend: FriendRequestValidator' , error));
      return res.send({ isError: true, message: error });
    }
  },
  getFriendRequests(req, res) {
    FriendRequest.find({ requestTo: req.user._id }, (err, friends) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer,'friendController.getFriendRequests' , err.message));
        return res.send('There was a error saving friend.');
      }
      return res.send(friends);
    });
  },
  getFriendsList(req, res) {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer,'friendController.getFriendsList' , err.message));
        return res.send('No friends found');
      } if (user == null) {
        return res.send([]);
      }
      return res.send(user.friendsList);
    });
  },
};
