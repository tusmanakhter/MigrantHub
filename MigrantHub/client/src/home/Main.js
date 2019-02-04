import React, { Component } from 'react';
import ServiceMain from 'services/ServiceMain';
import ServiceRecommendation from 'services/ServiceRecommendation';
import SearchBar from 'components/SearchBar';

class MainDashboard extends Component {

  render() {

    return (
      <React.Fragment>
        <SearchBar />
        <ServiceMain />
        <ServiceRecommendation location={this.props.location} />
      </React.Fragment>
    );
  }
}

export default MainDashboard;
