import React, { Component } from 'react';
import ServiceCategories from 'services/ServiceCategoryMenu2';
import ServiceRecommendation from 'services/ServiceRecommendation';

class MainDashboard extends Component {

  render() {

    return (
      <React.Fragment>
        <ServiceRecommendation location={this.props.location} />
        <ServiceCategories classes={this.props.classes}/>
      </React.Fragment>
    );
  }
}

export default MainDashboard;
