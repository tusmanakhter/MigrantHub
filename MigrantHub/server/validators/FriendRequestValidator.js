const validator = require('validator');
const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');
const UserTypes = require('../lib/UserTypes');

// helper function: makes sure the added user exists
async function checkForExistingUser(requestTo) {
  let error = '';
  try {
    // check if already sent a friend request
    const record = await User.findOne({
      _id: requestTo,
    });
    if (!record) {
      error = '\nEek! Inputted friend to add is not a valid user email.';
    }
  } catch (e) {
    error = '\nEek! Server Errors.';
  }
  return error;
}

// helper function: makes sure the added user isn't already a friend
async function checkForExistingFriend(requestFrom, requestTo) {
  let error = '';
  try {
    // check if already sent a friend request
    await User.findOne({
      _id: requestFrom,
    }, (err, user) => {
      if (err) {
        error = '\nEek! Server Errors.';
      } else {
        // TODO optimisation: change the storage of friends list into a schema
        for (let i = 0; i < user.friendsList.length; i += 1) {
          if ((user.friendsList[i].friend_id === requestTo) && (user.friendsList[i].state === 'accepted')) {
            error = "\nHmm, it seems you're already friends with this person!";
          }
        }
      }
    });
  } catch (e) {
    error = '\nEek! Server Errors.';
  }
  return error;
}

// helper function: checks if user is a migrant
async function checkForMigrantUser(requestTo) {
  let error = '';
  try {
    const record = await User.findOne({
      _id: requestTo,
    });
    if (record) {
      if (record.type !== UserTypes.MIGRANT) {
        error = 'Not a valid user. Try again.';
      }
    } else {
      error = 'Error validating user.';
    }
  } catch (e) {
    error = 'Server Errors.';
  }
  return error;
}

// helper function: checks for duplicate friend requests
async function checkForDuplicateRecord(requestFrom, requestTo) {
  let error = '';
  try {
    // check if already sent a friend request
    let record = await FriendRequest.findOne({
      requestFrom,
      requestTo,
    });
    if (record) {
      error = '\nOops! You have already sent this person a friend request.';
    } else {
      // check if already received a friend request
      record = await FriendRequest.findOne({
        requestFrom: requestTo,
        requestTo: requestFrom,
      });
      if (record) {
        error = '\nYou have already received a friend request from this person.';
      }
    }
  } catch (e) {
    error = '\nEek! Server Errors.';
  }
  return error;
}

// Function to perform server-side validation of the friend request before sending to db.
async function FriendRequestValidator(requestFrom, requestTo) {
  let error = '';
  if (validator.equals(requestFrom, requestTo)) {
    error = '\nUh oh! You cannot add yourself!';
  } else if (validator.isEmpty(requestFrom)) {
    error = '\nOh no! Problem with your session. Please log in again.';
  } else if (validator.isEmpty(requestTo)) {
    error = '\nOuf, empty box! Please input an email.';
  } else if (!validator.isEmail(requestFrom)) {
    error = '\nOh no! Problem with your session. Please log in again.';
  } else if (!validator.isEmail(requestTo)) {
    error = '\nEek! Inputted friend to add is not a valid user email.';
  } else {
    const duplicationError = await checkForDuplicateRecord(requestFrom, requestTo);
    if (duplicationError !== '') {
      error = duplicationError;
    } else {
      const existingUserError = await checkForExistingUser(requestTo);
      if (existingUserError) {
        error = existingUserError;
      } else {
        const existingFriendError = await checkForExistingFriend(requestFrom, requestTo);
        if (existingFriendError) {
          error = existingFriendError;
        } else {
          const existingMigrantError = await checkForMigrantUser(requestTo);
          if (existingMigrantError) {
            error = existingMigrantError;
          }
        }
      }
    }
  }
  return error;
}

module.exports = FriendRequestValidator;
