var User = require('../models/User');
var FriendRequest = require('../models/FriendRequest');
var validator = require('validator');

// Function to perform server-side validation of the friend request before sending to db.
async function FriendRequestValidator(requestFrom, requestTo) {
    let errors = "";
        if (validator.equals(requestFrom, requestTo)) {
            errors = "\nUh oh! You cannot add yourself!";
        }
        if (validator.isEmpty(requestFrom)) {
            errors += "\nOh no! Problem with your session. Please log in again.";
        }
        if (validator.isEmpty(requestTo)) {
            errors += "\nHmm, the box empty. Please input an email.";
        }
        if (!validator.isEmail(requestFrom)) {
            errors += "\nOh no! Problem with your session. Please log in again."
        }
        if (!validator.isEmail(requestTo)) {
            errors += "\nEek! Inputted friend to add is not a valid user email.";
        }

        let duplicationErrors = await checkForDuplicateRecord(requestFrom, requestTo);
        let existingUserErrors = await checkForExistingUser(requestTo);
        errors += duplicationErrors;
        errors += existingUserErrors;
    return errors;
};

//helper function: makes sure the added user exists
async function checkForExistingUser(requestTo) {
    let errors = "";
    try {
        //check if already sent a friend request
        let record = await User.findOne({
            _id: requestTo
        });
        if (!record) {
            errors += "\nEek! Inputted friend to add is not a valid user email.";
        }
    }
    catch(e) {
        errors += e;
        errors += "\nEek! Server Errors.";
    }
    return errors
}

//helper function: checks for duplicate friend requests
async function checkForDuplicateRecord(requestFrom, requestTo) {
    let errors = "";
    try {
        //check if already sent a friend request
        let record = await FriendRequest.findOne({
            requestFrom: requestFrom,
            requestTo: requestTo
        });
        if (record) {
            errors += "\nOops! You have already sent this person a friend request.";
        } else {
            //check if already received a friend request
            record = await FriendRequest.findOne({
                requestFrom: requestTo,
                requestTo: requestFrom
            });
            if (record) {
                errors += "\nYou have already received a friend request from this person.";
            }
        }
    }
    catch(e) {
        errors += "\nEek! Server Errors.";
    }
    return errors
}

module.exports = FriendRequestValidator;