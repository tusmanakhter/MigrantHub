const qs = require('qs');
const FriendRequest = require('../models/FriendRequest');
const FriendRequestValidator = require('../validators/FriendRequestValidator');
const User = require('../models/MigrantUser');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  acceptFriendRequest(req, res) {
    const parsedObj = qs.parse(req.body);
    User.findOne(
      {
        _id: req.user._id,
        friendsList: { $elemMatch: { friend_id: parsedObj.requestFrom } },
      }, (err, user) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'FriendController.acceptFriendRequest: find one', err.message));
          return res.send('Error finding your friends');
        }
        if (user == null) {
          User.update({ _id: req.user._id }, {
            $push: {
              friendsList: {
                friend_id: parsedObj.requestFrom,
                state: 'accepted',
                lastUpdate: Date.now(),
              },
            },
          }, (updateUserError) => {
            if (updateUserError) {
              logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                updateUserError.status, req.referer, 'FriendController.acceptFriendRequest: update requestTo', updateUserError.message));
              return res.send('There was a error accepting friend.');
            }
            User.update({ _id: parsedObj.requestFrom }, {
              $push: {
                friendsList: {
                  friend_id: parsedObj.requestTo,
                  state: 'accepted',
                  lastUpdate: Date.now(),
                },
              },
            }, (updateFriendError) => {
              if (updateFriendError) {
                logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                  updateFriendError.status, req.referer, 'FriendController.acceptFriendRequest: update requestFrom', updateFriendError.message));
                res.send("There was error adding to your friend's list of friend.");
              } else {
                FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (findError) => {
                  if (findError) {
                    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                      findError.status, req.referer, 'FriendController.acceptFriendRequest: delete request', findError.message));
                    return res.send('There was a error removing friend from requestfriend table.');
                  }
                  return res.send('Friend has been accepted and removed from request friend table');
                });
              }
            });
          });
        } else {
          User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.requestFrom }, { $set: { 'friendsList.$.state': 'accepted', 'friendsList.$.lastUpdate': Date.now() } }, (updateUserStateError) => {
            if (updateUserStateError) {
              logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                updateUserStateError.status, req.referer, 'FriendController.acceptFriendRequest: update requestFrom', updateUserStateError.message));
              return res.send('Unable to unfriend this user');
            }
          });
          User.update({ _id: parsedObj.requestFrom, 'friendsList.friend_id': parsedObj.requestTo }, { $set: { 'friendsList.$.state': 'accepted', 'friendsList.$.lastUpdate': Date.now() } }, (updateStateError) => {
            if (updateStateError) {
              logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                updateStateError.status, req.referer, 'FriendController.acceptFriendRequest: update requestTo', updateStateError.message));
              return res.send('Unable to unfriend this user');
            }
          });
          FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (findError) => {
            if (findError) {
              logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                findError.status, req.referer, 'FriendController.acceptFriendRequest: delete request', findError.message));
              return res.send('There was a error removing friend from requestfriend table.');
            }
            return res.send('Friend has been accepted and removed from request friend table');
          });
        }
      },
    );
  },
  rejectFriendRequest(req, res) {
    const parsedObj = qs.parse(req.body);

    FriendRequest.findByIdAndDelete({ _id: parsedObj._id }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'FriendController.rejectFriendRequest', err.message));
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
            err.status, req.referer, 'FriendController.addFriend: save request', err.message));
          return res.send({ isError: true, message: 'Yikes. Unable to add friend. :( ' });
        }
        return res.send({ isError: false, message: 'Woohoo! The request has successfully been sent :) ' });
      });
    } else {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '500', req.referer, 'FriendController.addFriend: FriendRequestValidator', error));
      return res.send({ isError: true, message: error });
    }
  },
  unfriend(req, res) {
    const parsedObj = qs.parse(req.body);
    User.update({ _id: req.user._id, 'friendsList.friend_id': parsedObj.friendId }, { $set: { 'friendsList.$.state': 'unfriended', 'friendsList.$.lastUpdate': Date.now() } }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'FriendController.unfriend', err.message));
        return res.send('Unable to unfriend this user');
      }
    });
    User.update({ _id: parsedObj.friendId, 'friendsList.friend_id': req.user._id }, { $set: { 'friendsList.$.state': 'unfriended', 'friendsList.$.lastUpdate': Date.now() } }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'FriendController.unfriend', err.message));
        return res.send('Unable to unfriend this user');
      }
      return res.send('User has been removed from your friend list');
    });
  },
  getFriendRequests(req, res) {
    FriendRequest.find({ requestTo: req.user._id }, (err, friends) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'FriendController.getFriendRequests', err.message));
        return res.send('There was a error saving friend.');
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
              cond: { $eq: ['$$friends.state', 'accepted'] },
            },
          },
        },
      },
    ]), (err, user) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'FriendController.getFriendsList', err.message));
        return res.send('There was a error listing friends.');
      }
      return res.send(user);
    });
  },

  // view users will continue to use regex
  // this won't be used for now as friends functionality is on pause
  viewUsers(req, res) {
    const { searchQuery } = req.query;
    let query = {};

    const tempSearchQuery = searchQuery;
    const regex = new RegExp(tempSearchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
    query = { $or: [{ firstName: regex }, { lastName: regex }] };
    query.deleted = false;

    User.find(query, (err, users) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'AccountController.viewUsers', err.message));
        return res.status(400).send('There was an error getting users.');
      }
      return res.status(200).send(users);
    });
  },
};
