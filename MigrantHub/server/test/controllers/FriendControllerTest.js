let { spy, stub, assert } = require('sinon');
let sinon = require('sinon');
let sinonTest = require('sinon-test');
let test = sinonTest(sinon);
let Controller = require('../../controllers/friendController');
let MigrantUser = require('../../models/MigrantUser');
let FriendRequest = require('../../models/FriendRequest');

describe('friend controller friend management', function () {
  let req = {
    body: {
      requestTo: "test@test.com",
      requestFrom: "testFrom@test.com",
      _id: "5bd33cb2e43f7f17bbe8422d"
    },
    user: {
      _id: "test@test.com",
      _id2: "testFrom@test.com",
    },
    friendsList: [{
      friend_id: "testFrom@test.com",
      isFriend: true,
    },
    {
      friend_id: "test1@test.com",
      isFriend: false,
    }],
  },
    error = new Error({ error: "err" }),
    res = {}, expectedResult;

  beforeEach(function () {
    res = {
      send: spy(),
      status: stub().returns({ end: spy() })
    };
  });

  it('should delete a friend request', test(function () {
    expectedResult = req.body
    this.stub(FriendRequest, 'findByIdAndDelete').yields(null, expectedResult);
    Controller.rejectFriendRequest(req, res);
    assert.calledWith(FriendRequest.findByIdAndDelete, { _id: "5bd33cb2e43f7f17bbe8422d" });
    assert.calledWith(res.send, "FriendRequest has been removed from table");
  }));

  it('should accept a friend request', test(function () {
    expectedResult = req.body
    this.stub(MigrantUser, 'findOne').yields(null, expectedResult, req.user._id);
    this.stub(MigrantUser, 'update').yields(null, expectedResult, req.user._id);
    this.stub(FriendRequest, 'findByIdAndDelete').yields(req._id);
    Controller.acceptFriendRequest(req, res);
    assert.calledWith(MigrantUser.findOne, { _id: req.user._id, friendsList: { $elemMatch: { friend_id: expectedResult.requestFrom } } });
    assert.calledWith(MigrantUser.update, { _id: req.user._id, 'friendsList.friend_id': expectedResult.requestFrom }, { $set: { 'friendsList.$.isFriend': true } });
    assert.calledWith(MigrantUser.update, { _id: req.user._id2, 'friendsList.friend_id': expectedResult.requestTo }, { $set: { 'friendsList.$.isFriend': true } });
    assert.calledWith(FriendRequest.findByIdAndDelete, { _id: "5bd33cb2e43f7f17bbe8422d" });
  }));

  it('should list all accepted friends', test(function () {
    expectedResult = req.friendsList
    this.stub(MigrantUser, 'aggregate').yields(null, expectedResult, req.user._id);
    Controller.getFriendsList(req, res);
    assert.calledWith(MigrantUser.aggregate, ([{ $match: { _id: req.user._id } }, { $project: { friendsList: { $filter: { input: '$friendsList', as: 'friends', cond: { $eq: ['$$friends.isFriend', true] } } } } }]));
  }));

  it('should set to false once deleted', test(function () {
    expectedResult = req.friendsList
    this.stub(MigrantUser, 'update').yields(null, expectedResult, req.user._id);
    Controller.unfriend(req, res);
    assert.calledWith(MigrantUser.update, { _id: req.user._id, 'friendsList.friend_id': expectedResult.friendId }, { $set: { 'friendsList.$.isFriend': false } });
  }));
});