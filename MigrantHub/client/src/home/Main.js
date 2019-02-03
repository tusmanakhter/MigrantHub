import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServiceCategory from 'services/ServiceCategory';
import ServiceRecommendation from 'services/ServiceRecommendation';
import SearchBar from 'components/SearchBar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Props
    };
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar />
        <ServiceCategory location={this.props.location} />
        <ServiceRecommendation location={this.props.location} />
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Main;
