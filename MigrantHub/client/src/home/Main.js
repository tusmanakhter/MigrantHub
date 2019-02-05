import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServiceMain from 'services/ServiceMain';
import ServiceRecommendation from 'services/ServiceRecommendation';
import SearchBar from 'components/SearchBar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

Main.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Main;
