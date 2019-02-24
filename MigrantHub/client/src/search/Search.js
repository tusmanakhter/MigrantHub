import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from "components/Grid/GridContainer.jsx";
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import EventCard from 'events/EventCard';
import UserItem from 'People/UserItem';
import QuestionnairePanel from 'components/QuestionnairePanel/QuestionnairePanel';
import Paper from '@material-ui/core/Paper';
import UserTypes from 'lib/UserTypes';
import { AuthConsumer } from 'routes/AuthContext';

const styles = theme => ({
  mainContainer: {
    marginLeft: 75,
    paddingTop: 100,
  },
  serviceContainer : {
    float: 'left',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  Panel: {
    float: 'right',
    position: 'absolute',
    right: 0,
    paddingTop: 25,
    width: '25%',
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesItem: [],
      eventItem: [],
      userItem: [],
    };

    this.getServices = this.getServices.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount(props) {
    this.getServices(this, props);
    this.getEvents(this, props);
    this.getUsers(this, props);
  }

  componentWillReceiveProps(props) {
    this.getServices(this, props);
    this.getEvents(this, props);
    this.getUsers(this, props);
  }

  getServices(event, props = this.props) {
    const { location } = props;
    let editOwnerEmail = '';
    let searchQuery = '';
    let searchMode = false;
    let category = '';
    let subcategory = '';

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
    let editOwnerEmail = '';

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

  getUsers(event, props = this.props) {
    const { location } = props;
    let searchQuery = '';

    if (location.state) {
      searchQuery = location.state.searchQuery;
    }

    axios.get('/api/friend/viewusers', {
      params: {
        searchQuery: searchQuery,
      },
    }).then((response) => {
      this.setState({
        userItem: response.data,
      });
    });
  }

  renderServices() {
    const { classes } = this.props;
    const { servicesItem } = this.state;

    if(this.state.servicesItem.length !== 0) {
        return (
        <div className={classes.serviceContainer}>
        <h4 className={classes.searchContainer}>Services</h4>
        <GridContainer>
        {' '}
        {
            servicesItem.map(item => (
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
                editMode={item.editMode}
                editOwner={item.editOwner}
                getServices={this.getServices}
            />
            ))
        }
        </GridContainer>
        </div>
        );
    }
  }

  renderEvents() {
    const { classes } = this.props;
    const { eventItem } = this.state;

    if(this.state.eventItem.length !== 0) {
        return (
        <div className={classes.eventContainer}>
        <h4 className={classes.searchContainer}>Events</h4>
        <GridContainer>
        {' '}
        {
            eventItem.map(item => (
              <EventCard
                eventId={item._id}
                eventName={item.eventName}
                eventImagePath={item.eventImagePath}
                description={item.description}
                location={item.location}
                dateStart={item.dateStart}
                dateEnd={item.dateEnd}
                timeStart={item.timeStart}
                timeEnd={item.timeEnd}
                editMode={item.editMode}
                editOwner={item.editOwner}
                getEvents={this.getEvents}
              />
            ))
        }
        </GridContainer>
        </div>
        );
    }
  }

  renderUsers() {
    const { classes } = this.props;
    const { userItem } = this.state;

    if(this.state.userItem.length !== 0) {
        return (
        <div className={classes.userContainer}>
        <h4 className={classes.searchContainer}>People</h4>
        <Paper className={classes.root} elevation={2}>
          {' '}
          {
              userItem.map(item => (
                <UserItem
                  userid={item._id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  getUsers={this.getUsers}
                />
              ))
          }
        </Paper>
        </div>
        );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <div className={classes.mainContainer}>
            { user.type === UserTypes.MIGRANT
              && <div className={classes.Panel}>{<QuestionnairePanel />}</div>
            }
            {this.renderServices()}
            {this.renderEvents()}
            {this.renderUsers()}
          </div>
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
