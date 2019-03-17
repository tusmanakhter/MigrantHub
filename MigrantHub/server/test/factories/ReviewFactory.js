module.exports.validReviewData = function() {
    return {
        _id:5,
        time: "2018-11-11 23:14:17.890",
        user: "test@test.com",
        firstName: "Bob",
        lastName: "Bobby",
        serviceId: "5be7c2e218d96e03298b71c3",
        rating: 3,
        comment: "i think this service is great!"
    };
};

module.exports.emptyReviewData = function() {
    return {
        _id:5,
        time: "",
        user: "",
        firstName: "",
        lastName: "",
        serviceId: "",
        rating: 3,
        comment: ""
    };
};

module.exports.invalidReviewData = function() {
    return {
        _id:5,
        time: "2018-11-11 23:14:17.890",
        user: "",
        firstName: "",
        lastName: "",
        serviceId: "5be7c2e218d96e03298b71c3",
        rating: 3,
        comment: ""
    };
};

