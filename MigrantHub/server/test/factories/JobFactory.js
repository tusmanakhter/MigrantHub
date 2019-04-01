module.exports.validJobData = function() {
  return {
    "_id" : "5c987e1f0c6e2045a7995900",
    "deleted" : false,
    "deletedDate" : null,
    "user" : "test@test.com",
    "title" : "Test Test",
    "description" : "This is a test description",
    "positionType" : "fullTime",
    "companyName" : "Test",
    "contactName" : "Test Test",
    "contactEmail" : "test@test.com",
    "contactPhone" : "1234567891",
    "location" : "FABRE, QC",
    "salaryStart" : null,
    "salaryEnd" : null,
    "website" : "",
    "dateCreated" : "2019-03-25T06:51:23.278Z",
    "__v" : 0
  };
};

module.exports.emptyJobData = function() {
  return {
    "_id" : "5c987e1f0c6e2045a7995900",
    "deleted" : false,
    "deletedDate" : null,
    "user" : "test@test.com",
    "title" : "",
    "description" : "",
    "positionType" : "",
    "companyName" : "",
    "contactName" : "",
    "contactEmail" : "",
    "contactPhone" : "",
    "location" : "",
    "salaryStart" : null,
    "salaryEnd" : null,
    "website" : "",
    "dateCreated" : "2019-03-25T06:51:23.278Z",
    "__v" : 0
  };
};

module.exports.invalidJobData = function() {
  return {
    "_id" : "5c987e1f0c6e2045a7995900",
    "deleted" : false,
    "deletedDate" : null,
    "user" : "test@test.com",
    "title" : "Test Test",
    "description" : "Too short",
    "positionType" : "fullTime",
    "companyName" : "Test",
    "contactName" : "Test Test",
    "contactEmail" : "test@test.com",
    "contactPhone" : "12345678911",
    "location" : "FABRE, QC",
    "salaryStart" : -11,
    "salaryEnd" : -11,
    "website" : "randomInvalidURL",
    "dateCreated" : "2019-03-25T06:51:23.278Z",
    "__v" : 0
  };
};
