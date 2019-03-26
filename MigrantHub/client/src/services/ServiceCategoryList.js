import React, { Component } from 'react';
import ServiceCategories from 'services/ServiceCategoryMenu2';
import PropTypes from 'prop-types';

class ServiceCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, classes } = this.props;
    return (
      <React.Fragment>
        <div>
          <h1>Service Categories</h1>
          <p>Select a category that you are looking for</p>
        </div>
        <ServiceCategories classes={classes} />
      </React.Fragment>
    );
  }
}

ServiceCategoryList.defaultProps = {
  classes: {},
};

ServiceCategoryList.propTypes = {
  classes: PropTypes.shape({}),
  location: PropTypes.shape({}).isRequired,
};

export default ServiceCategoryList;
