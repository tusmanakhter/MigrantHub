var Services = require('../models/Services');
var ServiceValidator = require('../validators/ServiceValidator');
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

        let errors = ServiceValidator(parsedObj);

        if (errors == "") {
            let services = new Services();
            services.email = req.user;
            services.serviceTitle = parsedObj.serviceTitle;
            services.serviceSummary = parsedObj.serviceSummary;
            services.serviceDescription = parsedObj.serviceDescription;
            services.serviceDate = parsedObj.serviceDate;
            services.location = parsedObj.location;
            services.serviceHours = parsedObj.serviceHours;
            if(parsedObj.serviceImageName === 'cameraDefault.png'){
                services.serviceImagePath = ('../default/' +parsedObj.serviceImageName);
            }else{
                services.serviceImagePath = ('../' + req.user._id + "/services/" + parsedObj.serviceImageName);
            }
            services.dateCreated = date;
            services.save(function (err) {
                if (err) {
                    console.log(err)
                    res.status(400).send("There was a error creating service.");
                } else {
                    res.status(200).send('Service has been created!');
                }
            });
        } else {
            res.status(400).send(errors);
        }
    },

    viewServices : function (req, res) {
        let query ={};

        if(req.query.editOwner !== '') {
            console.log("EditOwner" + req.query.editOwner);
            query["email"] = req.query.editOwner;
        }
        query["deleted"] = false;
        Services.find(query, function(err, services) {
            if (err) {
                res.status(400).send("There was a error getting services.");
            } else {
                res.status(200).send(services);
            }
        });
    },

    getServiceData : function (req, res) {
        let query ={};

        if(req.query._id !== '') {
            query["_id"] = req.query._id;
            query["deleted"] = false;
        }

        Services.findOne(query, function(err, services) {
            if (err) {
                res.status(400).send("There was a error getting services.");
            } else {
                res.status(200).send(services);
            }
        });
    },

    updateService: function(req, res) {

        let updateError = false;

        let parsedObj = qs.parse(req.body.serviceDetails);
        let errors = ServiceValidator(parsedObj);

        if (errors == "") {

            if (parsedObj.location === undefined) {
                parsedObj.location = {};
            }
            if (parsedObj.serviceDate === undefined) {
                parsedObj.serviceDate = {};
            }
            if (parsedObj.serviceHours === undefined) {
                parsedObj.serviceHours = [];
            }

            if ((parsedObj.serviceImagePath !== undefined) && (parsedObj.serviceImagePath !== ('../' + req.user._id + "/services/" + parsedObj.serviceImageName))) {
                fs.remove("uploads/" + parsedObj.serviceImagePath.toString().substring(3), function (err) {
                    if (err) {
                        updateError = true;
                    }
                })
            }

            if (parsedObj.serviceImageName === 'cameraDefault.png') {
                parsedObj.serviceImagePath = ('../default/' + parsedObj.serviceImageName);
            } else {
                parsedObj.serviceImagePath = ('../' + req.user._id + "/services/" + parsedObj.serviceImageName);
            }

            Services.findByIdAndUpdate({_id: parsedObj._id}, parsedObj, {new: true}, (err) => {
                    if (err) {
                        updateError = true;
                    }
                }
            )

            if (updateError) {
                return res.status(400).send("There was an error updating service.");
            }else{
                return res.status(200).send("Service updated successfully.");
            }
        }
    },

    deleteService: function(req, res) {   
        let deleteError = false;
        Services.updateOne({_id: req.params.id}, { deleted: true, deletedDate: Date.now() }, (err) => {
                if (err) {
                    deleteError = true;
                }
            }
        );

        if (deleteError) {
            res.status(400).send("There was an error deleting service.");
        } else {
            res.status(200).send("Service deleted successfully.");
        }
    },
};