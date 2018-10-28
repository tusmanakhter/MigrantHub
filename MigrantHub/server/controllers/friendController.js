var FriendRequest = require('../models/FriendRequest');
var FriendRequestValidator = require('../validators/FriendRequestValidator');
var qs = require('qs');

module.exports = {
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
}