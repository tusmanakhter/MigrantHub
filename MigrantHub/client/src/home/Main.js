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
    const { location, classes } = this.props;
    return (
      <React.Fragment>
        <ServiceRecommendation location={location} />
        <ServiceCategories classes={classes} />
      </React.Fragment>
    );
  }
}

Main.defaultProps = {
  classes: {},
};

Main.propTypes = {
  classes: PropTypes.shape({}),
  location: PropTypes.shape({}).isRequired,
};

export default Main;
