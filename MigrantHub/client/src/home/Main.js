import React, { Component } from 'react';
import ServiceMain from 'services/ServiceMain';
import SearchBar from 'components/SearchBar';

class MainDashboard extends Component {

  render() {

    return (
      <React.Fragment>
        <SearchBar />
        <ServiceMain />
      </React.Fragment>
    );
  }
}

export default MainDashboard;
