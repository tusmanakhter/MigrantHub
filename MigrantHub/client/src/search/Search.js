import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import EventCard from 'events/EventCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthConsumer } from 'routes/AuthContext';
import GridItem from 'components/Grid/GridItem.jsx';
import Grid from '@material-ui/core/Grid';
import SearchServiceContainer from 'search/serviceSearch/SearchServiceContainer';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  mainContainer: {
    paddingTop: 15,
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { searchQuery } = state;

    return (
      <AuthConsumer>
        {({ user }) => (
          <React.Fragment>
            <div>
              <SearchServiceContainer  editMode={false} searchQuery={searchQuery} searchMode={true} />
            </div>
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Search);
