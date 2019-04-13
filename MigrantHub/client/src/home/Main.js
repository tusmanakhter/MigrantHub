import React, { Component } from 'react';
import PinnedService from 'services/PinnedService';
import PropTypes from 'prop-types';
import ServiceRecommendation from 'services/ServiceRecommendation';
import SavedJobMain from 'jobs/saved/SavedJobMain';
import SavedEventMain from 'events/saved/SavedEventMain';

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
        <PinnedService classes={classes} />
        <SavedEventMain />
        <SavedJobMain smallCard />
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
