var validator = require('validator');

// Function to perform server-side validation of the friend request before sending to db.
const FriendRequestValidator = (friendRequestObject) =>{
    let errors = "";

    if (validator.isEmpty(friendRequestObject.requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again.";
    } else if (validator.isEmpty(friendRequestObject.requestTo)) {
        errors += "{'\n'}Empty friend request. Please input an email.";
    }
    if (!validator.isEmail(friendRequestObject.requestFrom)) {
        errors += "{'\n'}Problem with your session. Please log in again."
    } else if (!validator.isEmail(friendRequestObject.requestTo)) {
        errors += "{'\n'}Inputted friend to add is not a valid email.";
    }
    return errors;
};

module.exports = FriendRequestValidator;