var User = require('../models/User');
var FriendRequest = require('../models/FriendRequest');
var validator = require('validator');

// Function to perform server-side validation of the friend request before sending to db.
async function FriendRequestValidator(requestFrom, requestTo) {
    let error = "";
        if (validator.equals(requestFrom, requestTo)) {
            error = "\nUh oh! You cannot add yourself!";
        } else if (validator.isEmpty(requestFrom)) {
            error = "\nOh no! Problem with your session. Please log in again.";
        } else if (validator.isEmpty(requestTo)) {
            error = "\nOuf, empty box! Please input an email.";
        } else if (!validator.isEmail(requestFrom)) {
            error = "\nOh no! Problem with your session. Please log in again."
        } else if (!validator.isEmail(requestTo)) {
            error = "\nEek! Inputted friend to add is not a valid user email.";
        } else {
            let duplicationError = await checkForDuplicateRecord(requestFrom, requestTo);
            if (duplicationError !== "") {
                error = duplicationError;
            } else {
                let existingUserError = await checkForExistingUser(requestTo);
                if (existingUserError) {
                    error = existingUserError;
                }
            }
        }
    return error;
};

//helper function: makes sure the added user exists
async function checkForExistingUser(requestTo) {
    let error = "";
    try {
        //check if already sent a friend request
        let record = await User.findOne({
            _id: requestTo
        });
        if (!record) {
            error = "\nEek! Inputted friend to add is not a valid user email.";
        }
    }
    catch(e) {
        error = "\nEek! Server Errors.";
    }
    return error
}

//helper function: checks for duplicate friend requests
async function checkForDuplicateRecord(requestFrom, requestTo) {
    let error = "";
    try {
        //check if already sent a friend request
        let record = await FriendRequest.findOne({
            requestFrom: requestFrom,
            requestTo: requestTo
        });
        if (record) {
            error = "\nOops! You have already sent this person a friend request.";
        } else {
            //check if already received a friend request
            record = await FriendRequest.findOne({
                requestFrom: requestTo,
                requestTo: requestFrom
            });
            if (record) {
                error = "\nYou have already received a friend request from this person.";
            }
        }
    }
    catch(e) {
        error = "\nEek! Server Errors.";
    }
    return error
}

module.exports = FriendRequestValidator;