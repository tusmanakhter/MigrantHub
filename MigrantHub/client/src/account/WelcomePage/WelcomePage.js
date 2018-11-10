import React, { Component } from 'react';
import FeatureAuthentication from '../../toggle/FeatureAuthentication';
import Features from '../../toggle/Features';
import WelcomePageDefault from './default/WelcomePageDefault';
import WelcomePageVariationA from './variationA/WelcomePageVariationA';

class ContactInfo extends Component {
    render() {
        const variation = FeatureAuthentication.validFeature(Features.MigrantContact);
        if (variation) {
            return <WelcomePageVariationA/>;
        }
        return <WelcomePageDefault/>;
    }
}

export default ContactInfo;
