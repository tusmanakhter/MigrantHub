import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MainLayout from 'home/MainLayout';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EventItem from 'events/EventItem';
import Header from 'components/Header/Header';
import UserTypes from 'lib/UserTypes';
import NavPanel from 'components/NavPanel/NavPanel';
import GridContainer from "components/Grid/GridContainer.jsx";

const styles = theme => ({
  mainContainer: {
    marginLeft: 75,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToEventForm: false,
      editMode: '',
      editOwner: '',
    };

    this.getData = this.getData.bind(this);
    this.getUser = this.getUser.bind(this);
  }


  componentDidMount(props) {
    this.getData(this, props);
    this.getUser();
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
    this.getUser();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    });
  }

  getData(event, props = this.props) {
    const { location } = this.props;

    let editOwnerEmail = '';
    if (location.state) {
      this.setState({
        editMode: location.state.editMode,
        editOwner: location.state.editOwner,
      });

      editOwnerEmail = location.state.editOwner;
    }
    axios.get('/api/events/', {
      params: {
        editOwner: editOwnerEmail,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  setRedirectToEventForm = () => {
    this.setState({
      redirectToEventForm: true,
    });
  }

  renderRedirectToEventForm = () => {
    const { redirectToEventForm } = this.state;

    if (redirectToEventForm) {
      return <Redirect to="/events/create" />;
    }
  }

  render() {
    const { classes } = this.props;
    const { items, editMode, editOwner, type } = this.state;

    return (
      <MainLayout>
        <div className={classes.mainContainer}>
          {type !== UserTypes.ADMIN
            && (
              <div>
                {this.renderRedirectToEventForm()}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.setRedirectToEventForm}
                >
                  Create Event
               </Button>
              </div>
            )
          }
          <GridContainer>
            {
              items.map(item => (
                <EventItem
                  eventId={item._id}
                  eventName={item.eventName}
                  eventImagePath={item.eventImagePath}
                  description={item.description}
                  location={item.location}
                  dateStart={item.dateStart}
                  dateEnd={item.dateEnd}
                  timeStart={item.timeStart}
                  timeEnd={item.timeEnd}
                  editMode={editMode}
                  editOwner={editOwner}
                  getData={this.getData}
                />
              ))
            }
          </GridContainer>
        </div>
      </MainLayout>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EventList);
