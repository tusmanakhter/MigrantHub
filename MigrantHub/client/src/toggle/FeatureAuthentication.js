import axios from 'axios';

const FeatureAuthentication = {
    authenticateFeatures () {
        return new Promise((resolve) => {
            axios.get('/api/feature/enabled').then((response) => {
                let features = {};
                if (response.data.features) {
                    features = response.data.features;
                } else {
                    features = {};
                }
                localStorage.setItem('features', JSON.stringify(features));
                resolve('done');
            });
        });
    },
    validFeature(featureName) {
        const features = JSON.parse(localStorage.getItem('features'));
        return (
            !!features && featureName in features && features[featureName]
        );
    },
    unAuthenticateFeatures () {
        const features = {};
        localStorage.setItem('features', JSON.stringify(features));
    },
};

export default FeatureAuthentication;
