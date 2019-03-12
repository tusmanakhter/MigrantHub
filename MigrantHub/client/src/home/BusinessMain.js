import React, { Component } from 'react';
import logo from 'logo.svg';
import 'App.css';

class BusinessMain extends Component {
    state = {
      appName: 'Migrant Hub',
      appLogo: logo,
      userPic: logo,
      navOptions: [
        { description: 'Services', link: '/services' },
        { description: 'Events', link: '/events' },
        { description: 'Service Suggestions', link: '/services/suggestions' },
      ],
      navPanelVisibility: true
    };

    render() {
      const {
        appLogo, appName, userPic, navPanelVisibility, navOptions } = this.state;

      return (
        <div className="Main-feed">
          <h1>
              Welcome to your homepage
          </h1>
        </div>
      );
    }
}

export default BusinessMain;