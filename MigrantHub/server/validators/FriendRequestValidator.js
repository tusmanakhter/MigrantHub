var FriendRequest = require('../models/FriendRequest');
var validator = require('validator');

async function checkForDuplicateRecord(requestFrom, requestTo) {
    // do not allow duplicate friend requests
    let errors = "";
    try {
        //check if already sent a friend request
        let record = await FriendRequest.findOne({
            requestFrom: requestFrom,
            requestTo: requestTo
        });
        if (record) {
            errors += "\nYou have already sent this person a friend request.";
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
        console.log(errors);
    }
    catch(e) {
        errors += "{'\n'}Server Errors.";
    }
    return errors
}


// Function to perform server-side validation of the friend request before sending to db.
// const FriendRequestValidator = (requestFrom, requestTo) => {
async function FriendRequestValidator(requestFrom, requestTo) {
    let errors = "";
    // (async() => {
        console.log(requestFrom);
        if (validator.equals(requestFrom, requestTo)) {
            errors = "\nYou cannot add yourself!";
        }
        if (validator.isEmpty(requestFrom)) {
            errors += "\nProblem with your session. Please log in again.";
        }
        if (validator.isEmpty(requestTo)) {
            errors += "\nEmpty friend request. Please input an email.";
        }
        if (!validator.isEmail(requestFrom)) {
            errors += "\nProblem with your session. Please log in again."
        }
        if (!validator.isEmail(requestTo)) {
            errors += "\nInputted friend to add is not a valid email.";
        }

        let duplicationErrors = await checkForDuplicateRecord(requestFrom, requestTo);
        console.log('duplication errors: ' + duplicationErrors);
        errors += duplicationErrors;
        console.log(errors);
    // })()
    return errors;
};

module.exports = FriendRequestValidator;