import React, { Component } from 'react';
import ServiceCategory from 'services/ServiceCategory';
import ServiceRecommendation from 'services/ServiceRecommendation';
import SearchBar from 'components/SearchBar';

class MainDashboard extends Component {

  render() {
    const { friendPanelVisibility, serviceCategoryVisibility, SearchBarVisibility } = this.props;

    return (
      <React.Fragment>
        <SearchBar />
        <ServiceCategory location={this.props.location} />
        <ServiceRecommendation location={this.props.location} />
      </React.Fragment>
    );
  }
}

export default MainDashboard;
