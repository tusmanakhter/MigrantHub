var Services = require('../models/Services');
var qs = require('qs');

module.exports = {

    createService: function(req, res) {

        let parsedObj = qs.parse(req.body);
        let date = new Date();

        let services = new Services();
        services.email = req.user;
        services.serviceTitle = parsedObj.serviceTitle;
        services.serviceSummary = parsedObj.serviceSummary;
        services.serviceDescription = parsedObj.serviceDescription;
        services.serviceDate = parsedObj.serviceDate;
        services.location = parsedObj.location;
        services.serviceHours = parsedObj.serviceHours;
        services.dateCreated = date;
        services.save(function (err) {
            if (err) {
                console.log(err)
                res.status(400).send("There was a error creating service.");
                // Todo: Should create log with error
            } else {
                res.status(200).send('Service has been created!');
            }
        });
    },
};