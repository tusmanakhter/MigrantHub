var FriendRequest = require('../models/FriendRequest');
var qs = require('qs');

module.exports = {
    addFriend: function(req, res) {
        let parsedObj = qs.parse(req.body);
        let friendRequest = new FriendRequest();

        friendRequest.requestFrom = parsedObj.requestFrom;
        friendRequest.requestTo = parsedObj.requestTo;

        friendRequest.save(function (err) {
            if (err) {
                res.send('Unable to add friend. :( ')
                console.log(err)
            } else {
                res.send('Friend has been successfully added! :) ');
            }
        });
    },
}