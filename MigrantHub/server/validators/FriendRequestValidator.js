var FriendRequest = require('../models/FriendRequest');
var validator = require('validator');

// Function to perform server-side validation of the friend request before sending to db.
const FriendRequestValidator = (requestFrom, requestTo) =>{
    let errors = "";
    console.log(requestFrom);
    if (validator.equals(requestFrom, requestTo)) {
        errors += "{'\n'}You cannot add yourself!";
    }
    if (validator.isEmpty(requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again.";
    }
    if (validator.isEmpty(requestTo)) {
        errors += "{'\n'}Empty friend request. Please input an email.";
    }
    if (!validator.isEmail(requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again."
    }
    if (!validator.isEmail(requestTo)) {
        errors += "{'\n'}Inputted friend to add is not a valid email.";
    }

    //do not allow duplicate friend requests
    // var recordExists = FriendRequest.findOne({
    //     requestFrom: requestFrom,
    //     requestTo: requestTo
    // });
    // console.log(recordExists);
    // if (recordExists) {
    //     errors += "You have already sent this person a friend request.";
    // } else {
    //     recordExists = FriendRequest.findOne({
    //         requestFrom: requestTo,
    //         requestTo: requestFrom
    //     });
    //     if (recordExists) {
    //         errors += "This person has already sent you a friend request.";
    //     }
    // }
    console.log(errors);
    return errors;
};

module.exports = FriendRequestValidator;