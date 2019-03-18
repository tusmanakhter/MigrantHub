import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import EventCard from 'events/EventCard';
import UserItem from 'People/UserItem';
import Paper from '@material-ui/core/Paper';
import { AuthConsumer } from 'routes/AuthContext';
import GridItem from 'components/Grid/GridItem.jsx';
import Grid from '@material-ui/core/Grid';

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
      servicesItem: [],
      eventItem: [],
    };

    this.getServices = this.getServices.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount(props) {
    this.getServices(this, props);
    this.getEvents(this, props);
  }

  componentWillReceiveProps(props) {
    this.getServices(this, props);
    this.getEvents(this, props);
  }

  getServices(event, props = this.props) {
    const { location } = props;
    const editOwnerEmail = '';
    let searchQuery = '';
    let searchMode = false;
    const category = '';
    const subcategory = '';

    if (location.state) {
        searchQuery = location.state.searchQuery;
        searchMode = location.state.searchMode;
    }
    axios.get('/api/services/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery: searchQuery,
        search: searchMode,
        category: category,
        subcategory: subcategory,
      },
    }).then((response) => {
      this.setState({
        servicesItem: response.data,
      });
    });
  }

  getEvents(event, props = this.props) {
    const { location } = props;
    let searchQuery = '';
    let searchMode = false;
    const editOwnerEmail = '';

      if (location.state) {
        searchQuery = location.state.searchQuery;
        searchMode = location.state.searchMode;
      }

      axios.get('/api/events/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery: searchQuery,
        search: searchMode,
      },
    }).then((response) => {
      this.setState({
        eventItem: response.data,
      });
    });
  }

  renderServices() {
    const { classes } = this.props;
    const { servicesItem } = this.state;

    if(this.state.servicesItem.length !== 0) {
      return (
        <div className={classes.mainContainer}>
          <h5 className={classes.pageSubcategoriesTitle}>
          Services Search Results
          </h5>
          <Grid container spacing={16} alignItems="center" justify="center">
            {' '}
            {
              servicesItem.map(item => (
                <GridItem>
                  <ServiceCard
                    serviceId={item._id}
                    serviceTitle={item.serviceTitle}
                    serviceImagePath={item.serviceImagePath}
                    serviceDescription={item.serviceDescription}
                    serviceSummary={item.serviceSummary}
                    category={item.category}
                    subcategory={item.subcategory}
                    serviceLocation={item.location}
                    serviceDate={item.serviceDate}
                    serviceHours={item.serviceHours}
                    rating={item.avgRating}
                    count={item.countRating}
                  />
                </GridItem>
              ))
            }
          </Grid>
        </div>
      );
    }
  }

  renderEvents() {
    const { classes } = this.props;
    const { eventItem } = this.state;

    if(this.state.eventItem.length !== 0) {
      return (
        <div className={classes.mainContainer}>
          <h5 className={classes.pageSubcategoriesTitle}>
          Events Search Results
          </h5>
          <Grid container spacing={16} alignItems="center" justify="center">
            {' '}
            {
              eventItem.map(item => (
                <GridItem>
                  <EventCard
                    eventId={item._id}
                    eventName={item.eventName}
                    eventImagePath={item.eventImagePath}
                    eventDescription={item.description}
                    eventLocation={item.location}
                    dateStart={item.dateStart}
                    dateEnd={item.dateEnd}
                    timeStart={item.timeStart}
                    timeEnd={item.timeEnd}
                  />
                </GridItem>
              ))
            }
          </Grid>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <React.Fragment>
            <div>
              {this.renderServices()}
              {this.renderEvents()}
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
