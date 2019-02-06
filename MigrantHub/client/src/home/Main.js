import React, { Component } from 'react';
import ServiceCategories from 'services/ServiceCategoryMenu2';
import PropTypes from 'prop-types';
import ServiceRecommendation from 'services/ServiceRecommendation';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <ServiceRecommendation location={this.props.location} />
        <ServiceCategories classes={this.props.classes}/>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Main;
