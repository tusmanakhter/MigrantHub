var FriendRequest = require('../models/FriendRequest');
var validator = require('validator');

// Function to perform server-side validation of the friend request before sending to db.
const FriendRequestValidator = (friendRequestObject) =>{
    let errors = "";

    if (validator.isEmpty(friendRequestObject.requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again.";
    }
    if (validator.isEmpty(friendRequestObject.requestTo)) {
        errors += "{'\n'}Empty friend request. Please input an email.";
    }
    if (!validator.isEmail(friendRequestObject.requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again."
    }
    if (!validator.isEmail(friendRequestObject.requestTo)) {
        errors += "{'\n'}Inputted friend to add is not a valid email.";
    }

    var recordExists = FriendRequest.find({
        requestFrom: friendRequestObject.requestFrom,
        requestTo: friendRequestObject.requestTo
    })
    if (recordExists) {
        errors += "You have already sent this person a friend request.";
    } else {
        recordExists = FriendRequest.find({
            requestFrom: friendRequestObject.requestTo,
            requestTo: friendRequestObject.requestFrom
        })
        if (recordExists) {
            errors += "This person has already sent you a friend request.";
        }
    }
    return errors;
};

module.exports = FriendRequestValidator;