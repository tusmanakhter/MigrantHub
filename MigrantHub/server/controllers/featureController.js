module.exports = {
    getFeatures(req, res) {
        if (req.fflip) {
            let features = {features: req.fflip.features};
            console.log(features);
            return res.status(200).send(features);
        }
        return res.status(404).send('Error retrieving features');
    },

    ensureFeature(req, res) {
        let feature = req.body.feature;
        if (req.fflip) {
            return res.status(200).send(req.fflip.has(feature));
        }
        return res.status(404).send('Error retrieving verifying feature');
    },
};
