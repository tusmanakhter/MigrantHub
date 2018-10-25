var Services = require('../models/Services');
var qs = require('qs');
var multer  = require('multer')
let fs = require('fs-extra');

var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.session);
        let path = 'uploads/' + req.session.passport.user._id + '/services/';
        fs.ensureDirSync(path);
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});

module.exports = {

    upload : multer({ storage: multerStorage }),

    createService: function(req, res) {

        let parsedObj = qs.parse(req.body.serviceDetails);
        let date = new Date();

        let services = new Services();
        services.email = req.user;
        services.serviceTitle = parsedObj.serviceTitle;
        services.serviceSummary = parsedObj.serviceSummary;
        services.serviceDescription = parsedObj.serviceDescription;
        services.serviceDate = parsedObj.serviceDate;
        services.location = parsedObj.location;
        services.serviceHours = parsedObj.serviceHours;
        if(parsedObj.serviceImageName === 'cameraDefault.png'){
            services.serviceImagePath = ('/default/' +parsedObj.serviceImageName);
        }else{
            services.serviceImagePath = (req.user._id + "/services/" + parsedObj.serviceImageName);
        }
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